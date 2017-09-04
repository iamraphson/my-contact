'use strict'
const Validator = use('Validator')
const User = use('App/Model/User')
const Hash = use('Hash')

class AuthController {
	* showLogin(request, response) {
		yield response.sendView('auth.login')
	}

	* showRegister(request, response) {
		yield response.sendView('auth.register')
	}

	* postRegister(request, response) {
		//set validation rules for registration form
		const rules = {
			name: 'required|max:255',
			email: 'required|email|max:255|unique:users',
			password: 'required|min:6|max:30|confirmed'
		}

		//validate form input
		const validation = yield Validator.validateAll(request.all(), rules)

		//return back to registration form with error messages if validation fails.
		if (validation.fails()) {
			yield request.withOnly('name', 'email').andWith({ errors: validation.messages() }).flash()
			response.redirect('back')
			return
		}

		// persist to database
		yield User.create({
			name: request.input('name'),
			email: request.input('email'),
			password: yield Hash.make(request.input('password'))
		})

		//redirect user to login page
		response.redirect('/auth/signin')
	}

	/**
	 * @param request
	 * @param response
	 * Handle user login
	 */
	* postLogin(request, response){
			const email = request.input('email')
			const password = request.input('password')
			try {
				yield request.auth.attempt(email, password)
				response.redirect('/contacts')
			} catch (e) {
				yield request.with({error: 'Invalid credential'}).flash()
				response.redirect('back')
			}
	}

	/**
	 * Logout  user
	 */
	* logout(request, response) {
		// logouts the user
		yield request.auth.logout()
		// redirect to login page
		response.redirect('/auth/signin')
	}
}

module.exports = AuthController
