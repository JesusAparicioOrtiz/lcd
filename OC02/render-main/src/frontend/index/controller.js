/*!
governify-render 1.0.0, built on: 2018-05-09
Copyright (C) 2018 ISA group
http://www.isa.us.es/
https://github.com/isa-group/governify-render#readme

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/

$scope.displayError = "none"



/*! Devuelve un payload a partir de unos dígitos y unos tamaños
 *  @param digitos un array de strings que representa los distintos digitos
 *  @param tamanos un array de strings que representa los tamaños de cada digito en el 7-segmentos
 *  @return un array de objetos donde cada objeto tiene una propiedad 't' tamaño y otra 'n' digito
 */
var buildPayload = (digitos,tamanos) => {
    var payload = []
    for(var i = 0;i<digitos.length ;i++){
        payload.push({t:Number(tamanos[i]), n:Number(digitos[i])})
    }
    return payload
}

/*! Determina los números para el LCD a partir de unos digitos y unos tamaños,
 *  de modo que hace un POST a la LCD API para obtener los números en formato
 *  7-segmentos y de esta manera modificar la variable lcdNumbers del scope
 */
$scope.getLCDnumbers = function() {
    var digitos = $scope.digitos.split(",")
        var tamanos = $scope.tamanos.split(",")
    if (angular.isDefined($scope.digitos) && angular.isDefined($scope.tamanos) &&
     $scope.digitos != "" && $scope.tamanos != "" &&
    digitos.length === tamanos.length) {

        //Building payload
        var payload= buildPayload(digitos,tamanos)
        
        // Call LCD API.
        var url = "http://localhost:8086/api/v1/numbers"
        
        $http.post(url,payload).then(response => {
            $scope.lcdNumbers = response.data.LCDnumbers
        }).catch(err => {
            console.log(err)
        })

        // Clear fields.
        $scope.displayError = "none"
        $scope.digitos = "";
        $scope.tamanos = "";
        $scope.errorForm = ""
    }else{
        $scope.displayError = "block"
        $scope.errorForm = "Debe haber el mismo número de digitos que de tamaños"
    }
}
