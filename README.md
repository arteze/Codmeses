# Codmeses
Codificar nombres de meses y días de la semana a base64.

# Lo que se intenta codificar
Meses y días de la semana:
```
enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre domingo lunes martes miércoles jueves viernes sábado
```
La memotécnica para saber la cantidad de días de los meses pasado de base 3 a la misma base que tenga el abecedario codificado restado 1, en este caso 23.

Febrero pasa de 32 a 28 (notar que empieza en 12 y se repite 10101):
```js
121010110101  1  2  1  0  1  0  1  1  0  1  0  1
             31 32 31 30 31 30 31 31 30 31 30 31
[...parseInt("121010110101",3).toString(23)].map(x=>(10+ +x).toString(23)).join("").toUpperCase()
> BDCCD
```

# Transformación del abecedario
La comparación entre el abecesario normal, haciendo que las vocales queden en el mismo lugar, mientras que algunas consonantes cambian de lugar.
```
Abecedario normal: 'A BCD E FGH I JKLMN O PQRST U VWX'
Abecedario nuevo:  'A BCD E FGJ I LMNPR O STVYZ U ÁÉ '
```
# Letras que faltan del abecedario

Se hace las letras que faltan en el abecedario nuevo y se suman las tildes de Sábado y Miércoles.
```
Abecedario normal: 'ABCDEFGHIJKILMNOPQROSTUVWXYZ   '
Abecedario nuevo:  'ABCDEFG IJ ILMN P ROSTUV  YZUÁÉ'
Abecedario con faltantes:  H  K    O Q      WX   ÁÉ = HKOQWXÁÉ
```

# Meses al nuevo abecedario:
Codificación de los meses, semanas y bisiestos con el nuevo abecedario:
```
ELENOXFEBNENOXKANTOXABNIJXKASOXHULIOXHUJIOXAGOPQOXPEMQIEKBNEXOCQUBNEXLORIEKBNEXDICIEKBNEXDOKILGOXJULEPXKANQEPXKIWNCOJEPXHUEREPXRIENLEPXPVBADOXBDCCD
```
# Partiendo la codificación por la X
Se usa parte la codificación por la letra X.
```
     ELENO    DOKILGO  BDCCD
   FEBNENO      JULEP
     KANTO     KANQEP
     ABNIJ  KIWNCOJEP
      KASO     HUEREP
     HULIO    RIENLEP
     HUJIO     PVBADO
    AGOPQO
PEMQIEKBNE
   OCQUBNE
 LORIEKBNE
 DICIEKBNE
```

# Transformación a base64:
```
vS1UUlluGCqq2ZioYx3GehHWVC1O8rv8+gOvYC/viwgeLCo8g6W8o8DOwC6nrZefIoWUrOpTmr3Lnw6x4dQIBkZl+5lwd71J0jBEsp4qXbw2iDaz
```
