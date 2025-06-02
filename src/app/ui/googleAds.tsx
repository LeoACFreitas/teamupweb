import Script from 'next/script'

export default function GoogleAds() {
    return (
        <>
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1417382630826215"
                crossOrigin="anonymous"></Script>
        </>
    )
}