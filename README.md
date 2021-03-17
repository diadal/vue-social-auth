[![Known Vulnerabilities](https://snyk.io/test/github/diadal/vue-social-auth/badge.svg)](https://snyk.io/test/github/diadal/vue-social-auth)

**NOTE:** The new Version works better

## ♻️ [Update Version Universal-Social-Auth](https://github.com/diadal/universal-social-auth)

# Laravel vue-social-auth

**vue-social-auth** is easily configurable solution for [Vue.js](https://vuejs.org/) & [Laravel](https://laravel.com/) with Socialite that provides Social login using Github, Facebook, Google, Vkontakte and other OAuth providers.


The best part about this library is that it is not strictly coupled to one request handling library like [vue-axios](https://github.com/imcvampire/vue-axios). You will be able to use it with different libraries.

For now it is tested to work with  [vue-resource](https://github.com/pagekit/vue-resource) and [axios](https://github.com/mzabriskie/axios) (using [vue-axios](https://github.com/imcvampire/vue-axios) wrapper).

**WARNING:** Default request library is `axios` using `vue-axios` wrapper plugin.

**NOTE:** It also work with any Php with `Socialite`

## Supported OAuth providers and configurations

## Installation

## firstly install `Socialite`

**NOTE:** make sure you config your `Socialite` configuration data in `services.php` & `.env` for more details
check  [https://socialiteproviders.netlify.com/](https://socialiteproviders.netlify.com/)

```bash
composer require laravel/socialite

```
## Next install vue-social-auth

```bash
npm install vue-social-auth
```

## Usage
```javascript
import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios'
import VueSocialauth from 'vue-social-auth'

Vue.use(VueAxios, axios)
Vue.use(VueSocialauth, {

  providers: {
    github: {
      clientId: '',
      redirectUri: '/auth/github/callback' // Your client app URL
    }
  }
})
```

```html
<button @click="AuthProvider('github')">auth Github</button>
<button @click="AuthProvider('facebook')">auth Facebook</button>
<button @click="AuthProvider('google')">auth Google</button>
<button @click="AuthProvider('twitter')">auth Twitter</button>
<button @click="AuthProvider('vkontakte')">auth Vkontakte</button>
```

## ♻️ Usage with Nuxt.js

Add `vue-social-auth/nuxt` to modules section of `nuxt.config.js`

Module automatically add to $auth or property selected

```js
{
  modules: [
    // Optionally passing options in module configuration
    ['vue-social-auth/nuxt', { 
      property: '$auth', // Optional property if the $auth property is being used by another module 
      providers: {
        github: {
          clientId: '',
          redirectUri: '/auth/github/callback' // Your client app URL
        }
      }
    }]
  ],

  // Optionally passing options in module top level configuration
  vueSocialAuth: {
    property: '$auth'
    providers: {
      // ...
    }
  }
}
```


### View Component
```javascript
<script>

  export default {

      data(){

          return {

          }

      },
       methods: {

            AuthProvider(provider) {

              var self = this

              this.$auth.authenticate(provider).then(response =>{

                self.SocialLogin(provider,response)

                }).catch(err => {
                    console.log({err:err})
                })

            },

            SocialLogin(provider,response){

                this.$http.post('/sociallogin/'+provider,response).then(response => {

                    console.log(response.data)

                }).catch(err => {
                    console.log({err:err})
                })
            },

        }
    }
</script>
```

#### Vue Router

```javascript

        {
          path: '/auth/:provider/callback',
          component: {
            template: '<div class="auth-component"></div>'
          }
        },

```

### Vue is Done let move to backend config `Laravel` with `Socialite`

#### Laravel Router

```php

Route::post('sociallogin/{provider}', 'Auth\AuthController@SocialSignup');
Route::get('auth/{provider}/callback', 'OutController@index')->where('provider', '.*');


```

#### OutController

```php

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OutController extends Controller
{


    public function __construct()
    {

    }


    public function index()
    {

      return view('welcome');

    }
}


```

#### Auth\AuthController

```php

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Socialite;

class AuthController extends Controller
{


    public function __construct()
    {

    }


    public function SocialSignup($provider)
    {
        // Socialite will pick response data automatic
        $user = Socialite::driver($provider)->stateless()->user();

        return response()->json($user);
    }

}


```


#### services.php

```php

<?php

return [

   // .....

    'twitter' => [
        'client_id'     => env('TWITTER_ID'),
        'client_secret' => env('TWITTER_SECRET'),
        'redirect'      => env('TWITTER_URL'),
    ],

    'facebook' => [
        'client_id'     => env('FACEBOOK_ID'),
        'client_secret' => env('FACEBOOK_SECRET'),
        'redirect'      => env('FACEBOOK_URL'),
    ],

    'github' => [
        'client_id'     => env('GITHUB_ID'),
        'client_secret' => env('GITHUB_SECRET'),
        'redirect'      => env('GITHUB_URL'),
    ],

    'google' => [
        'client_id'     => env('GOOGLE_ID'),
        'client_secret' => env('GOOGLE_SECRET'),
        'redirect'      => env('GOOGLE_URL'),
    ],

    'vkontakte' => [
        'client_id'     => env('VKONTAKTE_KEY'),
        'client_secret' => env('VKONTAKTE_SECRET'),
        'redirect'      => env('VKONTAKTE_REDIRECT_URI'),
    ],
];


```

#### .env

```text

TWITTER_ID=Your ID
TWITTER_SECRET=Your Secret
TWITTER_URL=https://example.com/auth/twitter/callback

FACEBOOK_ID=Your ID
FACEBOOK_SECRET=Your Secret
FACEBOOK_URL=https://example.com/auth/facebook/callback

GITHUB_ID=Your ID
GITHUB_SECRET=Your Secret
GITHUB_URL=https://example.com/auth/github/callback

GOOGLE_ID=Your ID
GOOGLE_SECRET=Your Secret
GOOGLE_URL=https://example.com/auth/google/callback

VKONTAKTE_KEY=Your ID
VKONTAKTE_SECRET=Your Secret
VKONTAKTE_REDIRECT_URI=https://example.com/auth/vkontakte/callback

```

#### VerifyCsrfToken Middleware

you may need to disable Csrf for the route if you receive `Error: Request failed with status code 419`

```php

<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [

        '/sociallogin/google','/sociallogin/facebook','/sociallogin/github','/sociallogin/twitter','/sociallogin/vkontakte'
    ];
}


```

[travis-image]: https://travis-ci.org/diadal/vue-social-auth.svg?branch=master
[travis-url]: https://travis-ci.org/diadal/vue-social-auth

if any issue [check](https://github.com/diadal/vue-social-auth/issues)

*also you can buy me a coffee @ [Patreon](https://www.patreon.com/diadal)*

## License

The MIT License (MIT)

Copyright (c) 2018 Diadal Nig LTD

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
