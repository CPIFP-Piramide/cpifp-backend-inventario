create table departamentos(
	nombre varchar(255) primary key
);

create table articulos (
	id serial primary key,
	nombre varchar(255),
	descripcion text,
	espacio varchar(255),
	departamento varchar(255),
	foreign key (departamento) references departamentos(nombre)
);
