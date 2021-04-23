'use strict'

/*! Devuelve un nivel del 7-segmentos que se va a representar
 *  @param digitos un string que representa los distintos digitos
 *  @param tamano un numero que indica el tamaño del 7-segmentos
 *  @param izquierda los números que en ese nivel tienen representación en el segmento
 *                  de la izquierda (4 ó 5)
 *  @param medio los números que en ese nivel tienen representación en el segmento
 *                  del medio (0,3 ó 6)
 *  @param derecha los números que en ese nivel tienen representación en el segmento
 *                  de la derecha (1 ó 2)
 *  @return un string que representa el un nivel de los números en 7-segmentos
 */
const getNivel = (digitos, segmentoIzquierda, segmentoMedio, segmentoDerecha, tamano, LCDnumber) => {
    for (var j = 0; j < digitos.length; j++) {
        for (var i = 0; i < tamano; i++) {
            var digito = digitos[j]
            if (i === 0) {
                if (segmentoIzquierda.includes(digito)) {
                    LCDnumber += "| "
                } else if (segmentoMedio.includes(digito)) {
                    LCDnumber += " -"
                } else {
                    LCDnumber += "  "
                }
            } else {
                if (segmentoMedio.includes(digito)) {
                    LCDnumber += " -"
                } else {
                    LCDnumber += "  "
                }
            }
        }
        if (segmentoDerecha.includes(digito)) {
            LCDnumber += "|"
        } else {
            LCDnumber += " "
        }
        LCDnumber += " "
    }
    LCDnumber += "\n"
    return LCDnumber
}

/*! Devuelve los números en formato 7-segmentos
 *  @param digitos un string que representa los distintos digitos
 *  @param tamano un numero que indica el tamaño del 7-segmentos
 *  @param diccionario7segmentos un mapa que para cada segmento indica que número contiene ese segmento
 *  @return un string que representa los números en formato 7-segmentos
 */
const getLCD = (digitos,tamano,diccionario7segmentos) => {
    var LCDnumber = ""
    var LCDnumber1 = getNivel(digitos, "", diccionario7segmentos[0], "", tamano, LCDnumber)
    var LCDnumber2 = getNivel(digitos, diccionario7segmentos[5], "", diccionario7segmentos[1], tamano, LCDnumber).repeat(tamano)
    var LCDnumber3 = getNivel(digitos, "", diccionario7segmentos[6], "", tamano, LCDnumber)
    var LCDnumber4 = getNivel(digitos, diccionario7segmentos[4], "", diccionario7segmentos[2], tamano, LCDnumber).repeat(tamano)
    var LCDnumber5 = getNivel(digitos, "", diccionario7segmentos[3], "", tamano, LCDnumber)
    LCDnumber += LCDnumber1 + LCDnumber2 + LCDnumber3 + LCDnumber4 + LCDnumber5
    return LCDnumber
}


/*! Se convertirá un número a siete segmentos, donde el siete segmentos viene dado por:
 *     _0_    
 *   |5   1|
 *     _6_  
 *   |4   2|
 *     _3_
 *
 */
module.exports.convertToLCD = function convertToLCD(req, res, next) {
    var numerosAndTamaños = req.Numbers.value

    var LCDnumbers = []
    /*! Diccionario que para cada segmento indica que números que tienen ese segmento.
     */
    var diccionario7segmentos = {
        0: "23567890",
        1: "12347890",
        2: "134567890",
        3: "2356890",
        4: "2680",
        5: "456890",
        6: "2345689"
    }

    numerosAndTamaños.forEach(numeroAndTamaño => {
        var tamano = numeroAndTamaño.t
        var digitos = String(numeroAndTamaño.n)
        var LCDnumber = getLCD(digitos,tamano,diccionario7segmentos)
        LCDnumbers.push(LCDnumber)
    });
    res.header("Access-Control-Allow-Origin","*") //Cabecera para permitir el acceso desde otros puertos (CORS)
    res.send({
        LCDnumbers: LCDnumbers
    });
};

module.exports.corsSupport = function corsSupport(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "content-type");
    res.send({});
};