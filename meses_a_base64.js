function gen_abc(){
	var abc = Array(26).fill().map((j,i)=>String.fromCharCode(65+i)).join("")
	return abc
}
function abc_faltan(nabc){
	var abc = gen_abc()
	var f = [...abc].map(x=>nabc.indexOf(x)==-1?x:abc.indexOf(x)==-1?x:"").join("")
	var g = [...nabc].map(x=>abc.indexOf(x)==-1?x:"").join("")
	return f+g
}
function b64_a_bigint(b64){
	var bi = BigInt("0x"+[...atob(b64)]
		.map(x=>(256+x.charCodeAt()).toString(16).slice(1))
		.join(""))
	return bi
}
function bigint_a_cod(nabc,bi){
	var arr = []
	var base = BigInt(nabc.length)
	while(bi>0){
		arr.unshift( (10+ +(""+(bi%base))).toString(36) )
		bi /= base
	}
	var s = arr.join("").toUpperCase()
	return s
}
function ordenar_vocales(dabc){
	var i = 0, j = 0, rabc = [], v = "AEIOU "
	var abc = Array(26).fill("").map(x=> String.fromCharCode((97+j++)) ).join("").toUpperCase()
	var nabc = [...new Set(dabc)].sort().join("")
	var rev = [...v].map(x=>RegExp(`(.*)(${x})(.*)`,"g"))
	rev.map(x=>(nabc=nabc.replace(rev[i++],"$1$3$2"))&&null)
	nabc = eval(nabc.replace(new RegExp(`([^${v}]+)([${v}\s]+)`,"g"),"['$1','$2']"))
	var p = [..."9cfkpuz"].map(x=>parseInt(x,36)-9)
	for(var k=0;k<p.length-1;++k){
		var t = nabc[1][k]
		var d = nabc[0].slice(p[k],p[k+1])
		rabc.push(t?t:"",d?d:"")
	}
	rabc = rabc.join("").toUpperCase()
	return rabc
}
function decodificar(nabc,cod){
	var mabc = abc_faltan(nabc)
	var sep = mabc.match(/[A-Z]/g).slice(-1)[0]
	var dec = [...cod].map(x=>nabc[parseInt(x,36)-10]).join("")
	return dec
}
function decodificar_partes(base,dec){
	var p = dec.split(" ")
	p[p.length-1] = parseInt([...p[p.length-1]].map(x=>parseInt(x,base)-10).join(""),base).toString(3)
	var c = p.map(x=>x.toLowerCase())
	return c
}
function base64_a_meses(mabc,b64){
	var dabc = abc_faltan(mabc)
	var nabc = ordenar_vocales(dabc)
	var base = nabc.length-1
	var bi = b64_a_bigint(b64)
	var cod = bigint_a_cod(nabc,bi)
	var dec = decodificar(nabc,cod)
	var partes = decodificar_partes(base,dec)
	console.log(partes)
	return partes
}
var mabc = "HKQWXÁÉ "
var b64 = "vS1UUlluGCqq2ZioYx3GehHWVC1O8rv8+gOvYC/viwgeLCo8g6W8o8DOwC6nrZefIoWUrOpTmr3Lnw6x4dQIBkZl+5lwd71J0jBEsp4qXbw2iDaz"
var e = base64_a_meses(mabc,b64)
console.log(e)
