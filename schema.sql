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

insert into departamentos values ('FRONT'),('BACK');
insert into articulos (nombre, descripcion, espacio, departamento) values 
('Aprendiendo React: Guía práctica para aprender desde cero', '¿Eres un desarrollador con conocimientos en JavaScript que busca adentrarse en el mundo de React.js? "Aprendiendo React" es tu guía esencial y completa para empezar y dominar esta popular biblioteca JavaScript. En este libro, explorarás todos los aspectos de React, desde sus fundamentos hasta las técnicas avanzadas, a través de una serie de conceptos intermedios vitales.

Comenzando con una introducción a React, este libro te guiará a través de la configuración del entorno de desarrollo, la creación de proyectos, la comprensión de los componentes, el manejo de eventos y el ciclo de vida de los componentes. En secciones posteriores, abordarás temas más complejos como la gestión del estado global, el enrutamiento, los estilos, el consumo de APIs y la optimización del rendimiento.

Además, aprenderás a garantizar la calidad de tu código con pruebas y cómo preparar y desplegar tus aplicaciones para un entorno de producción. El libro también incluye discusiones sobre SEO y rendimiento de las aplicaciones de React en producción.

"Aprendiendo React" te equipará con las habilidades y conocimientos necesarios para convertirte en un eficaz desarrollador frontend en el mundo moderno del desarrollo web. Ya sea que estés comenzando tu viaje con React o buscando reforzar tus conocimientos existentes, este libro es el recurso definitivo que necesitas para aprender React.js', 'Sala de formación', 'FRONT'),
('Git y GitHub desde cero: Guía de estudio teórico-práctica paso a paso más curso en vídeo', 'Aprender a trabajar con Git y GitHub es una habilidad esencial para cualquier persona dedicada al desarrollo de software.
Lo mejor de todo es que puedes hacerlo en tan solo unas pocas horas.

Tan importante como aprender a programar, es hacerlo de manera segura. Estas dos herramientas son fundamentales para ello, ya que más del 95% del sector las utiliza a diario.

Esta guía, desde cero y paso a paso, te ayudará a comprender sus fundamentos, mientras aprendes la teoría y la aplicas en la práctica, gracias al curso incluido en el libro. Un curso en vídeo de 5 horas al que puedes acceder de forma gratuita desde mouredev.com/git-github.

Pero, si existe un curso en vídeo gratis, ¿por qué un libro?
Creo que la mejor manera de asegurar tu aprendizaje es combinando esta guía de fácil comprensión con el curso. Te servirá para seguir el curso clase a clase, entender cada lección, profundizar en sus conceptos, y aprender muchas cosas nuevas. También encontrarás secciones para destacar y ampliar las ideas más importantes, pudiendo consultar cualquier duda rápidamente.

45 lecciones, decenas de comandos y casos prácticos para comenzar a usar rápidamente Git y GitHub de manera profesional.', 'Sala de formación', 'BACK');
