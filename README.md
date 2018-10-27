# API de Programming URJC

## Introducción
Una API para utilizar los datos proporcionados en el server de Programming URJC

## Endpoints

### /api/YEAR/users/ (GET)

Acceso público, devuelve un JSON con los datos de usuarios, sustituir YEAR por el curso en progreso (2018 o 2019)

### /api/YEAR/problems/CATEGORY/ (GET)

Acceso público, devuelve un JSON con los datos de los problemas, sustituir YEAR por el curso en progreso (2018 o 2019), sustituir CATEGORY por la categoría de problemas.

### /api/YEAR/users\_problems/CATEGORY/ (GET)

Acceso público, devuelve un JSON con los datos de los problemas, sustituir YEAR por el curso en progreso (2018 o 2019), sustituir CATEGORY por la categoría de problemas.

### /api/user/ (POST)

Dados los campos:

| Campo         | Valor   | Descripción                                              |
|:-------------:|:-------:|:--------------------------------------------------------:|
| spoj\_handler | string  | Handler de SPOJ de un usuario                            |
| aer\_handler  | numeric | Handler de AER de un usuario                             |
| identifier    | string  | Identificador unívoco de un usuario (nombre y apellidos) |
| api\_secret   | string  | Identificador secreto para completar la petición         |

Inserta un usuario nuevo en la BBDD para el curso 2019

### /api/user/ (DELETE)

Borra un usuario de la BBDD dado su identifier. Campos requeridos.

| Campo         | Valor   | Descripción                                              |
|:-------------:|:-------:|:--------------------------------------------------------:|
| identifier    | string  | Identificador unívoco de un usuario (nombre y apellidos) |
| api\_secret   | string  | Identificador secreto para completar la petición         |

### /api/problem/ (POST)

Dados los campos:

| Campo         | Valor   | Descripción                                              |
|:-------------:|:-------:|:--------------------------------------------------------:|
| problem\_code | string  | Código de un problema a mostrar en la web                |
| domain        | string  | Dominio del cual se extrae (SPOJ, AER)                   |
| category      | string  | Categoría donde se colocará el problema                  |
| url           | string  | Identificador de la web donde se aloja el problema       |
| difficulty    | numeric | Dificultad del problema de 1 a 5 (1 siendo más fácil)    |
| api\_secret   | string  | Identificador secreto para completar la petición         |

Inserta un problema nuevo en la base de datos en la categoría seleccionada del curso 2019.

### /api/problem/ (DELETE)

Borra un problema de la BBDD dado su url. Campos requeridos.

| Campo         | Valor   | Descripción                                              |
|:-------------:|:-------:|:--------------------------------------------------------:|
| url           | string  | Identificador unívoco de un usuario (nombre y apellidos) |
| api\_secret   | string  | Identificador secreto para completar la petición         |

