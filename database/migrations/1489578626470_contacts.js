'use strict'

const Schema = use('Schema')

class ContactsTableSchema extends Schema {

  up () {
    this.create('contacts', (table) => {
      table.increments()
	    table.integer('user_id').unsigned()
	    table.string('first_name').nullable()
	    table.string('last_name').nullable()
	    table.string('office_number').nullable()
	    table.string('home_number').nullable()
		  table.string('office_email').nullable()
		  table.string('personal_email').nullable()
		  table.date('birthday').nullable()
		  table.text('note').nullable()
      table.timestamps()
	    table.foreign('user_id').references('users.id')
	    table.softDeletes()
    })
  }

  down () {
    this.drop('contacts')
  }

}

module.exports = ContactsTableSchema
