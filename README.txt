Kenelle sivusto on suunnattu?
    Kurssin opettajalle, sekä kaikille nuoruusvuosia muisteleville ikänörteille.

Minkä hyödyn sivusto tuottaa kohderyhmälle?
    Pääsee chattailemaan nostalgisissa fiiliksissä, eikä NSA seuraa (paitsi nyt kun NSA avainsana löytyi tästä).

Kuvaa miten testasit sivuston toimivuuden?
    Kokeilin vaan kaikkea mitä yritin saada aikaiseksi.

Mitä vaikeuksia kohtasit ja miten niistä selvisit?
    Monenlaista. Viestit ja käyttäjät sisältävät divin tahtoivat aluksi vain suurentua kun viestit eivät mahtuneet niihin, vaikka tarkoitus oli,
    että silloin tulee vierityspalkki esiin.

    Toinen vaikeus oli saada sivu oikealla tavalla responsiivikseksi, että ala ja yläpalkin koko määräytyy aina sisällön mukaan ja keskialueen koko
    elää viewportin mukana, samoin gapit piti saada pysymään samankokoisina

    Päädyin laittamaan ylä ja alapalkin korkeudet autolle ja keskiosan korkeudeksi calc(100vh - 140px),
    eli täydestä viewportin korkeudesta kun vähennetään 140px niin ala ja yläpalkki sopii myös viewporttiin.
    Eli näin yläpalkki ja alapalkki sekä välit pysyivät vakiokorkuisina ja keskiosan korkeus muuttuu viewportin mukana.
    
    Noihin mittoihin tuo ensimmäinenkin ongelma liittyi mutta juuri nyt en muista mitä kaikkea kokeilin ja mikä siinä oli lopulta ratkaisevaa.
    Pitäisi kokeilla pelkästään tuota asiaa testailla ja selvittää ittelle että mikäs se ongelma tasan tarkkaan oli mutta selvitetään
    sitten joskus jos se tulee uusiksi eteen, nyt on muutakin tekemistä.