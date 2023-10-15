function gen_abc(){
	var j = 0
	var abc = Array(26).fill("").map(x=> String.fromCharCode((97+j++)) ).join("").toUpperCase()
	return abc
}
function abc_faltan(nabc){
	var abc = gen_abc()
	var f = [...abc].map(x=>nabc.indexOf(x)==-1?x:abc.indexOf(x)==-1?x:"").join("")
	var g = [...nabc].map(x=>abc.indexOf(x)==-1?x:"").join("")
	return f+g
}
function codificar(a,b){
	var i = 0, j = 0, r = [], rabc = [], nt = [], v = "AEIOU "
	var c = b.toUpperCase()
	var abc = Array(26).fill("").map(x=> String.fromCharCode((97+j++)) ).join("").toUpperCase()
	var rev = [...v].map(x=>RegExp(`(.*)(${x})(.*)`,"g"))
	var nabc = [...new Set(c)].sort().join("")
	rev.map(x=>(nabc=nabc.replace(rev[i++],"$1$3$2"))&&null)
	nabc = eval(nabc.replace(new RegExp(`([^${v}]+)([${v}\s]+)`,"g"),"['$1','$2']"))
	var p = [..."9cfkpuz"].map(x=>parseInt(x,36)-9)
	for(var k=0;k<p.length-1;++k){
		var t = nabc[1][k]
		var d = nabc[0].slice(p[k],p[k+1])
		rabc.push(t?t:"",d?d:"")
	}
	rabc = rabc.join("").toUpperCase()
	var m = [...c].map(x=>nt.push([rabc.indexOf(x),x]))
	var n = [...parseInt(a,3).toString(rabc.length-1)]
		.map(x=>(10+parseInt(x,36)).toString(36))
		.join("")
		.toUpperCase()
	var o = nt.map(x=> (10+x[0]).toString(36) ).join("").toUpperCase()
	var p = o + (10+rabc.indexOf(" ")).toString(36).toUpperCase() + n
	return [rabc,n,p]
}
function cod_a_bigint(x){
	var base = BigInt([...new Set(x)].length)
	var bi = 0n
	for(var i in x){
		bi *= base
		bi += BigInt(parseInt(x[i],36)-10)
	}
	return bi
}
function bigint_a_b64(bi){
	var arr = []
	var base = 256n
	while(bi>0){
		arr.unshift( String.fromCharCode(+(""+(bi%base))) )
		bi /= base
	}
	var s = arr.join("")
	var b64 = btoa(s)
	return b64
}
function meses_a_base64(a,b){
	var codificado = codificar(a,b)
	var bi = cod_a_bigint(codificado[2])
	var b64 = bigint_a_b64(bi)
	var nabc = abc_faltan(codificado[0])
	return [nabc,b64]
}
var a = "121010110101"
var b = "enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre domingo lunes martes miércoles jueves viernes sábado"
console.log(meses_a_base64(a,b))
