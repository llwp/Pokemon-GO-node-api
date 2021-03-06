'use strict';

var Pokeio = require('./poke.io');

//Set environment variables or replace placeholder text
var location = process.env.PGO_LOCATION || {'type':'name','name':'Times Square'};
var username = process.env.PGO_USERNAME || 'USER';
var password = process.env.PGO_PASSWORD || 'PASS';

Pokeio.SetLocation(location, function(err, loc) {
    if (err) throw err;

    console.log('[i] Current location: ' + location.name);
    console.log('[i] lat/long/alt: : ' + loc.latitude + ' ' + loc.longitude + ' ' + loc.altitude);

    Pokeio.GetAccessToken(username, password, function(err, token) {
        if (err) throw err;

        Pokeio.GetApiEndpoint(function(err, api_endpoint) {
            if (err) throw err;

            Pokeio.GetProfile(function(err, profile) {
                if (err) throw err;

                console.log('[i] Username: ' + profile.username);
                console.log('[i] Poke Storage: ' + profile.poke_storage);
                console.log('[i] Item Storage: ' + profile.item_storage);

                var poke = 0;
                if (profile.currency[0].amount) {
                    poke = profile.currency[0].amount;
                }

                console.log('[i] Pokecoin: ' + poke);
                console.log('[i] Stardust: ' + profile.currency[1].amount);
            });
        });
    });
});
