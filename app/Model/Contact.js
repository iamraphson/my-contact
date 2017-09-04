'use strict'

const Lucid = use('Lucid')

class Contact extends Lucid {
	static get table () {
		return 'contacts'
	}

	/**
	 * Specify the table primary key
	 * @returns {string}
	 */
	static get primaryKey () {
		return 'id'
	}

	user(){
		return this.belongsTo('App/Model/User')
	}
}

module.exports = Contact
