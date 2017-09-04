'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
	static get table () {
		return 'users'
	}

	/**
	 * Specify the table primary key
	 * @returns {string}
	 */
	static get primaryKey () {
		return 'id'
	}

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	static get hidden () {
		return ['password']
	}

	contact(){
		return this.hasMany('App/Model/Contact', 'id', 'user_id')
	}
}

module.exports = User
