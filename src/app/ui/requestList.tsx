'use client'

import { useEffect, useRef, useState } from "react"
import { TORequest } from "../types"
import Request from "./request"
import { useFetch } from '../lib/FetchContext'
import CreateRequestButton from "./createRequestButton"
import { useSelector } from "react-redux"
import RequestsFilter from "./requestsFilter"
import InfiniteScroll from "react-infinite-scroll-component"

export interface Filter {
  name?: string
  showMyRequests?: boolean,
  country?: string
}

export default function RequestList() {
  const [filter, setFilter] = useState<Filter>({})
  const [requests, setRequests] = useState<TORequest[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const fetchWithAuth = useFetch()
  const executeFirstFetch = useRef(true)
  const requestsChangedOnSession = useSelector((state: any) => state.request.requestsChangedOnSession)
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
  const prevIsAuthenticated = useRef(null)

  useEffect(() => {
    if (requestsChangedOnSession > 0)
      resetRequests()
  }, [requestsChangedOnSession])

  useEffect(() => {
    if (prevIsAuthenticated.current !== null && prevIsAuthenticated.current !== isAuthenticated) {
      setFilter({})
      resetRequests()
    }
    prevIsAuthenticated.current = isAuthenticated
  }, [isAuthenticated])

  useEffect(() => {
    if (executeFirstFetch.current) {
      executeFirstFetch.current = false
      fetchRequests()
    }
  }, [filter])

  function resetRequests() {
    executeFirstFetch.current = true
    setRequests([])
    setPage(1)
    setHasMore(true)
  }

  function fetchRequests() {
    const params = new URLSearchParams()
    if (filter.name)
      params.append('gameName', filter.name)
    if (filter.showMyRequests !== undefined) 
      params.append('showMyRequests', filter.showMyRequests.toString())
    if (filter.country)
      params.append('country', filter.country)
    params.append('page', page.toString())

    fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/request?${params.toString()}`)
      .then((response: any) => {
        try {
          if (!response.ok) {
            throw new Error('Failed to fetch data')
          }
          response.json().then((r: Array<TORequest>) => {
            setRequests((prevRequests) => [...prevRequests, ...r])
            setHasMore(r.length === 20)
            setPage((prevPage) => prevPage + 1)
          })
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }).catch((o: any) => console.log(o))
  }

  function nextInfiniteScroll() {
    if (page !== 1) {
      fetchRequests()
    }
  }

  return (
    <>
      <span style={{ marginLeft: '1em' }}>
        <CreateRequestButton />
      </span>
      <RequestsFilter filter={filter} setFilter={(f) => {resetRequests(); setFilter(f)}} />
      <InfiniteScroll dataLength={requests.length}
          next={nextInfiniteScroll}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p style={{ textAlign: 'center' }}>No more requests</p>}>
        <ul>
          {requests.map((request) => (
            <Request key={request.request_id} request={request} />
          ))}
        </ul>
      </InfiniteScroll>
    </>
  )
}
