export const MOCKED_SWAPI_DATA = [
  {
    "name": "Sand Crawler",
    "model": "Digger Crawler",
    "manufacturer": "Corellia Mining Corporation",
    "cost_in_credits": "150000",
    "length": "36.8 ",
    "max_atmosphering_speed": "30",
    "crew": "46",
    "passengers": "30",
    "cargo_capacity": "50000",
    "consumables": "2 months",
    "vehicle_class": "wheeled",
    "pilots": [],
    "films": [
      "https://swapi.py4e.com/api/films/1/",
      "https://swapi.py4e.com/api/films/5/"
    ],
    "created": "2014-12-10T15:36:25.724000Z",
    "edited": "2014-12-20T21:30:21.661000Z",
    "url": "https://swapi.py4e.com/api/vehicles/4/"
  },
  {
    "name": "T-16 skyhopper",
    "model": "T-16 skyhopper",
    "manufacturer": "Incom Corporation",
    "cost_in_credits": "14500",
    "length": "10.4 ",
    "max_atmosphering_speed": "1200",
    "crew": "1",
    "passengers": "1",
    "cargo_capacity": "50",
    "consumables": "0",
    "vehicle_class": "repulsorcraft",
    "pilots": [],
    "films": [
      "https://swapi.py4e.com/api/films/1/"
    ],
    "created": "2014-12-10T16:01:52.434000Z",
    "edited": "2014-12-20T21:30:21.665000Z",
    "url": "https://swapi.py4e.com/api/vehicles/6/"
  }
]



export const EXPECTED_DATA_SWAPI = [
  {
    "capacidad_carga": "50000",
    "consumibles": "2 months",
    "costo_en_creditos": "150000",
    "creadoEn": "2014-12-10T15:36:25.724000Z",
    "flota": "46",
    "editadoEn": "2014-12-20T21:30:21.661000Z",
    "tamaño": "36.8 ",
    "fabricante": "Corellia Mining Corporation",
    "velocidad_atmosferica_maxima": "30",
    "modelo": "Digger Crawler",
    "nombre": "Sand Crawler",
    "pasajeros": "30",
    "pilotos": [

    ],
    "peliculas": [
      "https://swapi.py4e.com/api/films/1/",
      "https://swapi.py4e.com/api/films/5/"
    ],
    "url": "https://swapi.py4e.com/api/vehicles/4/",
    "clase_vehiculo": "wheeled",
    "id": ""
  },
  {
    "capacidad_carga": "50",
    "consumibles": "0",
    "costo_en_creditos": "14500",
    "creadoEn": "2014-12-10T16:01:52.434000Z",
    "flota": "1",
    "editadoEn": "2014-12-20T21:30:21.665000Z",
    "tamaño": "10.4 ",
    "fabricante": "Incom Corporation",
    "velocidad_atmosferica_maxima": "1200",
    "modelo": "T-16 skyhopper",
    "nombre": "T-16 skyhopper",
    "pasajeros": "1",
    "pilotos": [

    ],
    "peliculas": [
      "https://swapi.py4e.com/api/films/1/"
    ],
    "url": "https://swapi.py4e.com/api/vehicles/6/",
    "clase_vehiculo": "repulsorcraft",
    "id": ""
  }
]

export const MOCKED_DYNAMO_DATA = [
  {
    "id": "61b7ba79-8568-455d-b6f7-1078ae746a91",
    "capacidad_carga": "50000",
    "clase_vehiculo": "wheeled",
    "consumibles": "2 months",
    "costo_en_creditos": "150000",
    "creadoEn": "2014-12-10T15:36:25.724000Z",
    "editadoEn": "2014-12-20T21:30:21.661000Z",
    "fabricante": "Corellia Mining Corporation",
    "flota": "46",
    "modelo": "Digger Crawler",
    "nombre": "Sand Crawler",
    "pasajeros": "30",
    "peliculas": [
      "https://swapi.py4e.com/api/films/1/",
      "https://swapi.py4e.com/api/films/5/"
    ],
    "pilotos": [
    ],
    "tamaño": "36.8 ",
    "url": "https://swapi.py4e.com/api/vehicles/4/",
    "velocidad_atmosferica_maxima": "30"
  }
]


export const MOCK_VEHICLE_CREATION = {
  "capacidad_carga": "50000",
  "clase_vehiculo": "wheeled",
  "consumibles": "2 months",
  "costo_en_creditos": "150000",
  "creadoEn": "2014-12-10T15:36:25.724000Z",
  "editadoEn": "2014-12-20T21:30:21.661000Z",
  "fabricante": "Corellia Mining Corporation",
  "flota": "46",
  "modelo": "Digger Crawler",
  "nombre": "Sand Crawler",
  "pasajeros": "30",
  "peliculas": [
    "https://swapi.py4e.com/api/films/1/",
    "https://swapi.py4e.com/api/films/5/"
  ],
  "pilotos": [
  ],
  "tamaño": "36.8 ",
  "url": "https://swapi.py4e.com/api/vehicles/4/",
  "velocidad_atmosferica_maxima": "30"
}
