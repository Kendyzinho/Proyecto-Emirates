Proyecto Semestral

Universidad de Tarapacá – Facultad de Ingeniería
Ingeniería Civil en Computación e Informática
Asignatura: Tecnologías Web

Integrantes del Equipo

Scrum Master: Rafael Nakata

Product Owner: Denis Condori

Developers: Bairon Nuñez
            Isaac Contreras
            Christopher Romo

Descripción General

El presente proyecto corresponde al desarrollo de una aplicación web SPA (Single Page Application) implementada en Angular, cuyo objetivo es simular una plataforma de gestión de reservas de Emirates.
El sistema permite que usuarios clientes puedan buscar vuelos, agregar reservas a un carrito y simular un proceso de compra, mientras que los administradores cuentan con un panel para gestionar vuelos (creación, edición y eliminación).

La aplicación incorpora los contenidos vistos en clases, tales como:

Interpolation

Property Binding

Event Binding

Two-way Binding

Template Reference Variables

Local References

Directivas: NgIf, NgFor, NgIf-else, @Input, @Output, @ViewChild

Creación de Components y Services

Uso de Guards, Routing y control de roles

Manejo de Observables y Promises

Implementación de Interfaces, Models, DTOs y Enums

Buenas prácticas de Angular y versionado con Git

Interfaz gráfica basada en Bootstrap

Objetivo del Proyecto

Desarrollar una aplicación SPA funcional que permita:

Gestionar usuarios (login, registro, perfil).

Proveer un catálogo de vuelos o servicios.

Permitir reservas mediante un carrito de compras.

Simular un proceso de compra.

Administrar vuelos mediante un panel exclusivo para usuarios administradores.

Mantener una estructura modular, escalable y organizada.

Aplicar correctamente los conceptos fundamentales de Angular.

Características y Módulos de la Aplicación:
Autenticación

Inicio de sesión
Registro de usuario
Cierre de sesión

Guards para protección de rutas

Menú dinámico según rol (cliente/administrador)

Gestión de Usuario

Visualización de perfil
Edición de datos personales
Panel principal del cliente

Módulo de Cliente

Búsqueda de vuelos/servicios
Visualización de resultados
Agregar vuelos al carrito
Gestión del carrito (ver, editar, eliminar)
Proceso de compra simulado
Visualización de ofertas

 Módulo de Administrador

Panel administrativo
Listado de vuelos disponibles
Creación de vuelos
Edición de vuelos
Eliminación de vuelos
Gestión completa (CRUD)

Interfaz y Diseño

Diseño responsivo con Bootstrap
Notificaciones visuales informativas y de error
Estructura consistente y amigable para el usuario

📁Estructura del Proyecto
src/app/
   header/
   footer/

   home/
   search-flights/
   flight-results/
   offers/

   login/
   register/

   customer-dashboard/
   profile-view/
   profile-edit/
   cart/
   checkout/

   admin-dashboard/
   admin-flights-list/
   admin-flight-add/
   admin-flight-edit/

   services/
       auth.service.ts
       user.service.ts
       flight.service.ts
       cart.service.ts
       booking.service.ts

   guards/
       auth.guard.ts
       admin.guard.ts

Tecnologías Utilizadas

Angular 15
TypeScript
Bootstrap 5
RxJS
Angular Router
Git / GitHub

