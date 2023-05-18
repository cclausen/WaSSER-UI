/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
  HttpParameterCodec,
  HttpContext,
} from '@angular/common/http';
import { CustomHttpParameterCodec } from '../encoder';
import { Observable } from 'rxjs';

// @ts-ignore
import { Presence } from '../model/presence';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root',
})
export class PresenceControllerService {
  protected basePath = 'http://localhost:8081';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();
  public encoder: HttpParameterCodec;

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string | string[],
    @Optional() configuration: Configuration
  ) {
    if (configuration) {
      this.configuration = configuration;
    }
    if (typeof this.configuration.basePath !== 'string') {
      if (Array.isArray(basePath) && basePath.length > 0) {
        basePath = basePath[0];
      }

      if (typeof basePath !== 'string') {
        basePath = this.basePath;
      }
      this.configuration.basePath = basePath;
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
  }

  // @ts-ignore
  private addToHttpParams(
    httpParams: HttpParams,
    value: any,
    key?: string
  ): HttpParams {
    if (typeof value === 'object' && value instanceof Date === false) {
      httpParams = this.addToHttpParamsRecursive(httpParams, value);
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
    }
    return httpParams;
  }

  private addToHttpParamsRecursive(
    httpParams: HttpParams,
    value?: any,
    key?: string
  ): HttpParams {
    if (value == null) {
      return httpParams;
    }

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        (value as any[]).forEach(
          (elem) =>
            (httpParams = this.addToHttpParamsRecursive(httpParams, elem, key))
        );
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(
            key,
            (value as Date).toISOString().substr(0, 10)
          );
        } else {
          throw Error('key may not be null if value is Date');
        }
      } else {
        Object.keys(value).forEach(
          (k) =>
            (httpParams = this.addToHttpParamsRecursive(
              httpParams,
              value[k],
              key != null ? `${key}.${k}` : k
            ))
        );
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value);
    } else {
      throw Error('key may not be null if value is not object or array');
    }
    return httpParams;
  }

  /**
   * @param personId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public allByPerson(
    personId: number,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext }
  ): Observable<Array<Presence>>;
  public allByPerson(
    personId: number,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext }
  ): Observable<HttpResponse<Array<Presence>>>;
  public allByPerson(
    personId: number,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext }
  ): Observable<HttpEvent<Array<Presence>>>;
  public allByPerson(
    personId: number,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext }
  ): Observable<any> {
    if (personId === null || personId === undefined) {
      throw new Error(
        'Required parameter personId was null or undefined when calling allByPerson.'
      );
    }

    let localVarHeaders = this.defaultHeaders;

    let localVarHttpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json'];
      localVarHttpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set(
        'Accept',
        localVarHttpHeaderAcceptSelected
      );
    }

    let localVarHttpContext: HttpContext | undefined =
      options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }

    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (
        this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)
      ) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let localVarPath = `/api/presences/${this.configuration.encodeParam({
      name: 'personId',
      value: personId,
      in: 'path',
      style: 'simple',
      explode: false,
      dataType: 'number',
      dataFormat: 'int64',
    })}`;
    return this.httpClient.request<Array<Presence>>(
      'get',
      `${this.configuration.basePath}${localVarPath}`,
      {
        context: localVarHttpContext,
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: localVarHeaders,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public allOpen(
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext }
  ): Observable<Array<Presence>>;
  public allOpen(
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext }
  ): Observable<HttpResponse<Array<Presence>>>;
  public allOpen(
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext }
  ): Observable<HttpEvent<Array<Presence>>>;
  public allOpen(
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext }
  ): Observable<any> {
    let localVarHeaders = this.defaultHeaders;

    let localVarHttpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json'];
      localVarHttpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set(
        'Accept',
        localVarHttpHeaderAcceptSelected
      );
    }

    let localVarHttpContext: HttpContext | undefined =
      options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }

    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (
        this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)
      ) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let localVarPath = `/api/presences`;
    return this.httpClient.request<Array<Presence>>(
      'get',
      `${this.configuration.basePath}${localVarPath}`,
      {
        context: localVarHttpContext,
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: localVarHeaders,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * @param personId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public openPresenceByPerson(
    personId: number,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext }
  ): Observable<Presence>;
  public openPresenceByPerson(
    personId: number,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext }
  ): Observable<HttpResponse<Presence>>;
  public openPresenceByPerson(
    personId: number,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext }
  ): Observable<HttpEvent<Presence>>;
  public openPresenceByPerson(
    personId: number,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext }
  ): Observable<any> {
    if (personId === null || personId === undefined) {
      throw new Error(
        'Required parameter personId was null or undefined when calling openPresenceByPerson.'
      );
    }

    let localVarHeaders = this.defaultHeaders;

    let localVarHttpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json'];
      localVarHttpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set(
        'Accept',
        localVarHttpHeaderAcceptSelected
      );
    }

    let localVarHttpContext: HttpContext | undefined =
      options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }

    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (
        this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)
      ) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let localVarPath = `/api/presences/open/${this.configuration.encodeParam({
      name: 'personId',
      value: personId,
      in: 'path',
      style: 'simple',
      explode: false,
      dataType: 'number',
      dataFormat: 'int64',
    })}`;
    return this.httpClient.request<Presence>(
      'get',
      `${this.configuration.basePath}${localVarPath}`,
      {
        context: localVarHttpContext,
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: localVarHeaders,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * @param personId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public startPresence(
    personId: number,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined; context?: HttpContext }
  ): Observable<any>;
  public startPresence(
    personId: number,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined; context?: HttpContext }
  ): Observable<HttpResponse<any>>;
  public startPresence(
    personId: number,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined; context?: HttpContext }
  ): Observable<HttpEvent<any>>;
  public startPresence(
    personId: number,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: undefined; context?: HttpContext }
  ): Observable<any> {
    if (personId === null || personId === undefined) {
      throw new Error(
        'Required parameter personId was null or undefined when calling startPresence.'
      );
    }

    let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
    if (personId !== undefined && personId !== null) {
      localVarQueryParameters = this.addToHttpParams(
        localVarQueryParameters,
        <any>personId,
        'personId'
      );
    }

    let localVarHeaders = this.defaultHeaders;

    let localVarHttpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [];
      localVarHttpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set(
        'Accept',
        localVarHttpHeaderAcceptSelected
      );
    }

    let localVarHttpContext: HttpContext | undefined =
      options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }

    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (
        this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)
      ) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let localVarPath = `/api/presences/start`;
    return this.httpClient.request<any>(
      'post',
      `${this.configuration.basePath}${localVarPath}`,
      {
        context: localVarHttpContext,
        params: localVarQueryParameters,
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: localVarHeaders,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * @param presenceId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public stopPresence(
    presenceId: number,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined; context?: HttpContext }
  ): Observable<any>;
  public stopPresence(
    presenceId: number,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined; context?: HttpContext }
  ): Observable<HttpResponse<any>>;
  public stopPresence(
    presenceId: number,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined; context?: HttpContext }
  ): Observable<HttpEvent<any>>;
  public stopPresence(
    presenceId: number,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: undefined; context?: HttpContext }
  ): Observable<any> {
    if (presenceId === null || presenceId === undefined) {
      throw new Error(
        'Required parameter presenceId was null or undefined when calling stopPresence.'
      );
    }

    let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
    if (presenceId !== undefined && presenceId !== null) {
      localVarQueryParameters = this.addToHttpParams(
        localVarQueryParameters,
        <any>presenceId,
        'presenceId'
      );
    }

    let localVarHeaders = this.defaultHeaders;

    let localVarHttpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [];
      localVarHttpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set(
        'Accept',
        localVarHttpHeaderAcceptSelected
      );
    }

    let localVarHttpContext: HttpContext | undefined =
      options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }

    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (
        this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)
      ) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let localVarPath = `/api/presences/stopById`;
    return this.httpClient.request<any>(
      'post',
      `${this.configuration.basePath}${localVarPath}`,
      {
        context: localVarHttpContext,
        params: localVarQueryParameters,
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: localVarHeaders,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * @param personId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public stopPresenceByUser(
    personId: number,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined; context?: HttpContext }
  ): Observable<any>;
  public stopPresenceByUser(
    personId: number,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined; context?: HttpContext }
  ): Observable<HttpResponse<any>>;
  public stopPresenceByUser(
    personId: number,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined; context?: HttpContext }
  ): Observable<HttpEvent<any>>;
  public stopPresenceByUser(
    personId: number,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: undefined; context?: HttpContext }
  ): Observable<any> {
    if (personId === null || personId === undefined) {
      throw new Error(
        'Required parameter personId was null or undefined when calling stopPresenceByUser.'
      );
    }

    let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
    if (personId !== undefined && personId !== null) {
      localVarQueryParameters = this.addToHttpParams(
        localVarQueryParameters,
        <any>personId,
        'personId'
      );
    }

    let localVarHeaders = this.defaultHeaders;

    let localVarHttpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [];
      localVarHttpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set(
        'Accept',
        localVarHttpHeaderAcceptSelected
      );
    }

    let localVarHttpContext: HttpContext | undefined =
      options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }

    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (
        this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)
      ) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let localVarPath = `/api/presences/stop`;
    return this.httpClient.request<any>(
      'post',
      `${this.configuration.basePath}${localVarPath}`,
      {
        context: localVarHttpContext,
        params: localVarQueryParameters,
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: localVarHeaders,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * @param personId
   * @param placeId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public stopPresenceByUser1(
    personId: number,
    placeId: number,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined; context?: HttpContext }
  ): Observable<any>;
  public stopPresenceByUser1(
    personId: number,
    placeId: number,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined; context?: HttpContext }
  ): Observable<HttpResponse<any>>;
  public stopPresenceByUser1(
    personId: number,
    placeId: number,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined; context?: HttpContext }
  ): Observable<HttpEvent<any>>;
  public stopPresenceByUser1(
    personId: number,
    placeId: number,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: undefined; context?: HttpContext }
  ): Observable<any> {
    if (personId === null || personId === undefined) {
      throw new Error(
        'Required parameter personId was null or undefined when calling stopPresenceByUser1.'
      );
    }
    if (placeId === null || placeId === undefined) {
      throw new Error(
        'Required parameter placeId was null or undefined when calling stopPresenceByUser1.'
      );
    }

    let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
    if (personId !== undefined && personId !== null) {
      localVarQueryParameters = this.addToHttpParams(
        localVarQueryParameters,
        <any>personId,
        'personId'
      );
    }
    if (placeId !== undefined && placeId !== null) {
      localVarQueryParameters = this.addToHttpParams(
        localVarQueryParameters,
        <any>placeId,
        'placeId'
      );
    }

    let localVarHeaders = this.defaultHeaders;

    let localVarHttpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [];
      localVarHttpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set(
        'Accept',
        localVarHttpHeaderAcceptSelected
      );
    }

    let localVarHttpContext: HttpContext | undefined =
      options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }

    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (
        this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)
      ) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let localVarPath = `/api/presences/stopHere`;
    return this.httpClient.request<any>(
      'post',
      `${this.configuration.basePath}${localVarPath}`,
      {
        context: localVarHttpContext,
        params: localVarQueryParameters,
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: localVarHeaders,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }
}
