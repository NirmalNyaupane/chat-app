import { NextFunction } from 'express';
import passport from 'passport';
import { Strategy, Profile } from 'passport-auth0'

passport.use(
    new Strategy({
        clientID: "uyiiiiii",
        clientSecret: "oiuilhkjl",
        callbackURL: "hohoijijii",
        domain: "ljojiiiiiiiiiiiiii"
    },
        async (_, __, profile: Profile, next: NextFunction) => {
            
        }
    )
)