# Modelo de Base de Datos

## Entidades Principales

1. **Cliente**
2. **Llamada**
3. **Transcripción**
4. **Requerimiento**

## Relaciones entre Entidades

1. **Cliente** - **Llamada**: Un cliente puede tener muchas llamadas.
2. **Llamada** - **Transcripción**: Una llamada tiene una transcripción.
3. **Transcripción** - **Requerimiento**: Una transcripción puede generar un requerimiento.

## Índices Recomendados

1. **Cliente (IdCliente)**
2. **Llamada (IdLlamada, IdCliente)**
3. **Transcripción (IdTranscripción, IdLlamada)**
4. **Requerimiento (IdRequerimiento, IdTranscripción)**

## Restricciones e Integridad

1. **FOREIGN KEY**: La relación entre `Llamada` y `Cliente` debe ser una clave foránea.
2. **FOREIGN KEY**: La relación entre `Transcripción` y `Llamada` debe ser una clave foránea.
3. **FOREIGN KEY**: La relación entre `Requerimiento` y `Transcripción` debe ser una clave foránea.

## Ejemplos de SQL (CREATE TABLE)

```sql
-- Crear la tabla Cliente
CREATE TABLE Cliente (
    IdCliente INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Telefono VARCHAR(20)
);

-- Crear la tabla Llamada
CREATE TABLE Llamada (
    IdLlamada INT PRIMARY KEY AUTO_INCREMENT,
    IdCliente INT,
    FechaHora DATETIME NOT NULL,
    Duracion TIME,
    FOREIGN KEY (IdCliente) REFERENCES Cliente(IdCliente)
);

-- Crear la tabla Transcripción
CREATE TABLE Transcripción (
    IdTranscripción INT PRIMARY KEY AUTO_INCREMENT,
    IdLlamada INT,
    Texto TEXT NOT NULL,
    FechaHora DATETIME NOT NULL,
    Duracion TIME,
    FOREIGN KEY (IdLlamada) REFERENCES Llamada(IdLlamada)
);

-- Crear la tabla Requerimiento
CREATE TABLE Requerimiento (
    IdRequerimiento INT PRIMARY KEY AUTO_INCREMENT,
    IdTranscripción INT,
    Descripción TEXT NOT NULL,
    FechaHora DATETIME NOT NULL,
    Estado ENUM('Pendiente', 'En Proceso', 'Completado') DEFAULT 'Pendiente',
    FOREIGN KEY (IdTranscripción) REFERENCES Transcripción(IdTranscripción)
);
```

Este modelo de base de datos te permitirá registrar las llamadas de los clientes, transcribir el audio en texto y luego documentar los requerimientos generados a partir de esas transcripciones.