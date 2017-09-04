'use strict'

const Validator = use('Validator')
const Contact = use('App/Model/Contact')
class ContactController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	* index(request, response) {
		const user = yield request.auth.getUser()
		if(request.input('search') != null){
			let contact = request.input('search');
			var contacts = yield Contact.query().where('user_id', user.id).where('first_name', 'like', '%' + contact + '%').orWhere('last_name', 'like', '%' + contact + '%').fetch();
		} else {
			var contacts = yield Contact.query().where('user_id', user.id).fetch();
		}

		yield response.sendView('contacts.index', { contacts: contacts.toJSON() })
	}

	/**
	 * Show the form for creating a new contact.
	 */
	* create(request, response){
		yield response.sendView('contacts.new');
	}

	/**
	 * Store a newly created contact in database.
	 */
	* store (request, response) {
			const rules = {
				first_name : 'required',
				last_name: 'required',
			}
			const validation = yield Validator.validate(request.all(), rules)

			//return back to create contact form with error messages if validation fails.
			if (validation.fails()) {
				yield request.withAll().andWith({ errors: validation.messages() }).flash()
				response.redirect('back')
				return
			}
			const user = yield request.auth.getUser()
			yield Contact.create({
				user_id: user.id,
				first_name: request.input('first_name'),
				last_name: request.input('last_name'),
				office_number: request.input('office_number'),
				home_number: request.input('home_number'),
				office_email: request.input('office_email'),
				personal_email: request.input('personal_email'),
				birthday: request.input('birthday') || null,
				note: request.input('note'),
			})

			yield request.with({ status: `The Contact has been created.` }).flash()
			response.redirect('back')
	}

	* show(request, response) {
			const contact = yield Contact.find(request.param('id'));
			yield response.sendView('contacts.show', {contact: (contact) ? contact.toJSON() : {}});
	}

	* edit(request, response) {
		const contact = yield Contact.find(request.param('id'));
		yield response.sendView('contacts.edit', {contact: (contact) ? contact.toJSON() : {}});
	}

	* update(request, response) {
			const rules = {
				first_name : 'required',
				last_name: 'required',
			}
			const validation = yield Validator.validate(request.all(), rules)

			//return back to create contact form with error messages if validation fails.
			if (validation.fails()) {
				yield request.withAll().andWith({ errors: validation.messages() }).flash()
				response.redirect('back')
				return
			}

			console.log(request.param('id'));
			const contact = yield Contact.find(request.param('id'));
			contact.first_name = request.input('first_name');
			contact.last_name = request.input('last_name');
			contact.office_number = request.input('office_number');
			contact.home_number = request.input('home_number');
			contact.office_email = request.input('office_email');
			contact.personal_email = request.input('personal_email');
			contact.birthday = request.input('birthday') || null;
			contact.note = request.input('note');

			yield contact.save()

			yield request.with({ status: 'Contact has been updated successfully' }).flash()
			response.redirect('back')
	}

	* destroy (request, response) {
		const contact = yield Contact.find(request.param('id'));
		yield contact.delete()
		yield request.with({ status: 'Contact has been deleted successfully' }).flash()
		response.redirect('/contacts')
	}
}

module.exports = ContactController
