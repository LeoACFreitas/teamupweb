/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface TOGame {
  /** @format int32 */
  game_id?: number;
  name?: string | null;
  /** @format double */
  value?: number;
}

export interface TORequest {
  /** @format int32 */
  request_id?: number;
  user?: TOUser;
  game?: TOGame;
  description?: string | null;
  /** @format date-time */
  date?: string;
}

export interface TOUser {
  /** @format int32 */
  user_id?: number;
  nickname?: string | null;
  /** @format double */
  sub?: number | null;
  country?: string | null;
}
