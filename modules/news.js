const fetch = require('node-fetch')
const apiKeyNoticias = 'd9a2a22e89f44971b249dbdada86884c';
const apyKeyPelis = '184ad13a' // get y post pelis
const request = require('request');


// home, about, location, mission, contact

exports.getHome = (req, res) => {
    res.render('index', { name: "NODEjarás de  llorar...Bienvenido" })
}
exports.getAbout = (req, res) => {
    res.render('About_Esto_acaba_de_empezar')
}
exports.getLocation = (req, res) => {
    res.render('Location_Ni_te_imaginas_lo_que_te_espera')
}
exports.getMission = (req, res) => {
    res.render('Mission_Morirnos_eso_hacemos')
}
exports.postMission = ('Mission_Morirnos_eso_hacemos', function (req, res) {
    let title = req.body.peli; // name del form
    let type = req.body.type; // name del form
    let url = `http://www.omdbapi.com/?type=${type}&t=${title}&apikey=${apyKeyPelis}`
    request(url, function (err, response, body) {

        if (err) {
            res.render('Mission_Morirnos_eso_hacemos', { result: 'Please, try again' });
        } else {
            let movies = JSON.parse(body)

            if (movies.Title === undefined || movies.Type === undefined) {
                res.render('Mission_Morirnos_eso_hacemos', { result: 'Please, enter any data' });
            } else {
                let movieTitle = movies.Title
                let movieType = movies.Type
                let movieDirector = movies.Director
                let movieYear = movies.Year
                let movieLang = movies.Language
                res.render('Mission_Morirnos_eso_hacemos', { movie: movieTitle, type: movieType, director: movieDirector, year: movieYear, lang: movieLang });

            }
        }
    });
});

exports.getContact = (req, res) => {

    const url = fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKeyNoticias}`)
        .then(item => item.json())
        .then(data => {
            let results = data.articles
            //    console.log(results);

            // console.log(data.articles[0].title);
            // console.log(data.articles[0].content);

            if (url === undefined) {
                res.render('Contact_Llama_llama_que_veras_que_gracia', {
                    titulo: 'Página General',
                    contenido: 'Estas son las ultimas noticias'
                })
            } else {
                res.render('Contact_Llama_llama_que_veras_que_gracia', {
                    results

                })


            }
        })

}



