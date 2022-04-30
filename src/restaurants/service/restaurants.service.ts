import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { ResultRestaurantDto } from '../dto/result-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(private httpService: HttpService) {}

  findAll(ciudad: string): Observable<AxiosResponse<any>> {
    return this.httpService
      .get(
        'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+' +
          ciudad +
          '&radius=2000&key=AIzaSyDjgRu_79hF30QmVPLEdLg_Gzcsyl7M1nM',
      )
      .pipe(map((response) => response.data['results']));
  }
}
