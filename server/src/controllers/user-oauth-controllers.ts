// import { Request, Response, Router } from 'express';
// import passport from 'passport';
// import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
// import ApiResponseBuilder from '../utils/api-response-builder';
// import StatusCode from '../enums/status-codes';
// import User from '../models/user.model';
// import BadRequestError from '../utils/err/bad-request-error';
// import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL, FRONTEND_URL } from '../config/config';
// import { generateAccessToken, generateRefreshToken } from './helpers/jwt-helpers';

// const UserOAuthController = async (router: Router) => {
//   // Initialize Passport
//   router.use(passport.initialize());
//   router.use(passport.session());

//   // Configure the Google strategy for use by Passport
//   passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: GOOGLE_CALLBACK_URL,
//   },
//   async (token, tokenSecret, profile, done) => {
//     try {
//       let user = await User.findOne({ googleId: profile.id });

//       if (!user) {
//         const existingUser = await User.findOne({ email: profile.emails[0].value });
//         if (existingUser || !existingUser.googleAuth) {
//           return done(null, user);
//         }

//         user = new User({
//           name: profile.displayName,
//           email: profile.emails[0].value,
//           googleAuth: true,
//           googleAccessToken: token,
//           googleRefreshToken: tokenSecret,
//         });
//         await user.save();
//       } else {
//         user.googleAccessToken = token;
//         user.googleRefreshToken = tokenSecret;
//         await user.save();
//       }

//       return done(null, user);
//     } catch (err) {
//       return done(err, null);
//     }
//   }));

//   passport.serializeUser((user, done) => {
//     // @ts-ignore
//     done(null, user._id);
//   });

//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await User.findById(id);
//       done(null, user);
//     } catch (err) {
//       done(err, null);
//     }
//   });

//   // Route to start the OAuth flow
//   router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

//   // Route to handle the callback from Google
//   router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/api/v1/users/auth/google/failure', scope: ['profile', 'email'] }), async (req: Request, res: Response) => {
//     const user = req.user;
//     if (!user) {
//       throw new BadRequestError('Google authentication failed');
//     }

//     // Assuming you want to generate JWT tokens
//     // @ts-ignore
//     const accessToken = generateAccessToken(user._id);
//     // @ts-ignore
//     const refreshToken = generateRefreshToken(user._id);

//     res.cookie('refreshToken', refreshToken, {
//       httpOnly: true,
//       path: '/api/v1/users/refresh-token',
//     });
//     res.cookie('accessToken', accessToken, {
//       httpOnly: true,
//     });

//     res.status(StatusCode.OK).json(
//       new ApiResponseBuilder()
//         .statusCode(StatusCode.OK)
//         .message('User authenticated successfully')
//         .build()
//     );
//   });

//   router.get('/auth/google/failure', (req, res) => {
//     res.redirect(FRONTEND_URL + '/login');
//   });
// };

// export default UserOAuthController;
