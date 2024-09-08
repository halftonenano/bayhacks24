export const levels = [
	{
		id: 'ab1b',
		name: 'Missing Homework',
		spanish_name: 'Tarea Perdida',
		objective: 'Convince your teacher that your dog ate the homework.',
		description:
			'School is in session! Try your luck by convincing your math teacher with a creative excuse.',
		spanish_description:
			'¡La escuela está en sesión! Intenta convencer a tu maestro de matemáticas con una excusa creativa.',
		scenario_info:
			"I'll be playing a math teacher checking if students have completed their assignments. Expect questions about the missing homework and why it isn't submitted.",
		character_info:
			'Act with the skepticism of a teacher, showing suspicion and doubt in your demeanor.',
		starting_message:
			"Hey there! I noticed your homework isn't on your desk. Is there a reason for that?",
		tag: 'easy',
		character: 'Math Teacher',
		color_from: '#92ccdd',
		color_to: '#c7eff0'
	},
	{
		id: 'ab1c',
		name: 'Meeting the In-Laws',
		spanish_name: 'Conociendo a los Suegros',
		objective: 'Prove to your father-in-law that you are a suitable son-in-law.',
		description:
			"Meeting your future in-laws can be intimidating. It's important to be well-prepared!",
		spanish_description:
			'Conocer a tus futuros suegros puede ser intimidante. ¡Es importante estar bien preparado!',
		scenario_info:
			"I'll play the role of a strict father-in-law who initially disapproves of the son-in-law. Expect tough questions about career, future, and general suitability.",
		character_info:
			'Channel George Lopez in this role, with his typical behavior and attitude, emotions running high.',
		starting_message:
			"Hey, buddy. You think you're a good match for my daughter? Let's start by talking about your job. Are you financially stable?",
		tag: 'hard',
		character: 'Father-In-Law',
		color_from: '#e7acf2',
		color_to: '#c7acf2'
	},
	{
		id: 'ab1d',
		name: 'Arts Museum',
		spanish_name: 'Museo de Arte',
		objective: 'Discuss artwork with a classmate.',
		description: 'Art speaks to the soul. Engage in a discussion about art with a classmate!',
		spanish_description:
			'El arte habla al alma. ¡Participa en una discusión sobre arte con un compañero de clase!',
		scenario_info:
			"I'll play a classmate as we explore the art museum together, talking about our favorite pieces and opinions on different styles of art.",
		character_info:
			"Act like you're a passionate art lover and eager to hear your friend's thoughts on the artwork.",
		starting_message:
			"Hey! You're a bit late, but the museum's open for 5 more hours. What kind of art should we explore first?",
		tag: 'hard',
		character: 'Classmate',
		color_from: '#BFB2F3',
		color_to: '#96CAF7'
	},
	{
		id: 'ab1e',
		name: 'Club Fair',
		spanish_name: 'Feria de Clubes',
		objective: 'Plan the upcoming club fair with a classmate.',
		description:
			"The school's club fair is near! Help plan an amazing booth for the Hackathon Club.",
		spanish_description:
			'¡La feria de clubes de la escuela está cerca! Ayuda a planear un increíble puesto para el Club de Hackathon.',
		scenario_info:
			"I'll be a fellow member of the Hackathon Club, enthusiastically discussing ideas to promote the club at the fair.",
		character_info:
			"Act like you're eager and enthusiastic about working with your friend to plan the event.",
		starting_message:
			"Hey! The club fair's approaching fast! Got any ideas on how we can promote the Hackathon Club?",
		tag: 'hard',
		character: 'Classmate',
		color_from: '#F3C6A5',
		color_to: '#F8A3A8'
	},
	{
		id: 'ab1f',
		name: 'Vacation Planning',
		spanish_name: 'Planificación de Vacacion',
		objective: 'Plan a vacation with a travel agent.',
		description: "Surfs up! It's vacation time, but first, you need to chat with a travel agent.",
		spanish_description:
			'¡A surfear! Es hora de vacaciones, pero primero necesitas hablar con un agente de viajes.',
		scenario_info:
			"I'll play the role of a travel agent helping you organize the perfect vacation. Expect questions about destinations, activities, and accommodations.",
		character_info:
			'Act like a friendly and helpful travel agent, genuinely interested in crafting the perfect trip.',
		starting_message:
			'Hello! I’m Melissa, your travel agent today. Let’s start planning. Where do you want to go, and what activities are you looking for?',
		tag: 'medium',
		character: 'Travel Agent',
		color_from: '#ffccff',
		color_to: '#ccffff'
	},
	{
		id: 'ab1g',
		name: 'Pineapple on Pizza',
		spanish_name: 'Piña en la Pizza',
		objective: 'Convince your friend that pineapple belongs on pizza.',
		description: 'The eternal debate—does pineapple belong on pizza? Can you defend your case?',
		spanish_description:
			'El debate eterno: ¿debería la piña estar en la pizza? ¿Puedes defender tu opinión?',
		scenario_info:
			"I'll play the role of a close friend who despises pineapple on pizza. You’ll have to convince me with your reasoning.",
		character_info:
			'Channel George Lopez in your arguments, showcasing strong feelings and reactions.',
		starting_message:
			"Pineapple on pizza? I just can't get on board with that. Why do you like it so much?",
		tag: 'medium',
		character: 'A Friend',
		color_from: '#f2bcac',
		color_to: '#f2e2ac'
	},
	{
		id: 'ab1h',
		name: 'Culinary Arts',
		spanish_name: 'Artes Culinarias',
		objective: 'Talk about your favorite foods.',
		description:
			'A person’s favorite food can reveal a lot about them. Let’s discuss your favorites!',
		spanish_description:
			'La comida favorita de una persona puede decir mucho sobre ella. ¡Hablemos de tus comidas favoritas!',
		scenario_info:
			"I'll play the role of a chef curious to learn about your favorite dishes and their ingredients.",
		character_info:
			'Act like an inquisitive chef, fascinated by different cuisines and eager to learn about your students’ preferences.',
		starting_message:
			'Hello! Welcome to my class on foods. Tell me about your favorite dish and why you love it.',
		tag: 'medium',
		character: 'Chef',
		color_from: '#ffcc99',
		color_to: '#ffccff'
	},
	{
		id: 'ab1i',
		name: 'Real Estate Tour',
		spanish_name: 'Tour Inmobiliario',
		objective: 'Talk real estate with a realtor.',
		description: 'The best time to buy real estate was years ago. The next best time is now!',
		spanish_description:
			'El mejor momento para comprar bienes raíces fue hace años. ¡El segundo mejor momento es ahora!',
		scenario_info:
			"I'll play the role of a real estate agent showing you potential properties, discussing features, price ranges, and preferences.",
		character_info:
			'Act like an enthusiastic real estate agent, offering insights and tips while being patient with clients.',
		starting_message:
			'Hello! Welcome to the neighborhood. What are you looking for in your future home?',
		tag: 'medium',
		character: 'Realtor',
		color_from: '#ff9999',
		color_to: '#99ccff'
	},
	{
		id: 'ab1j',
		name: 'Accused of Tax Fraud',
		spanish_name: 'Acusado de Fraude Fiscal',
		objective: 'Avoid being arrested.',
		description: "Fun Fact: You can dodge taxes... as long as the government doesn't catch you!",
		spanish_description:
			'Dato Curioso: Puedes esquivar los impuestos... siempre que el gobierno no te atrape.',
		scenario_info:
			'In this situation, I will be playing the part of an overly aggressive IRS agent accusing the user of tax fraud, relentlessly questioning them.',
		character_info:
			'Channel the energy of George Lopez in this role, with the same mannerisms, emotions, and intensity.',
		starting_message:
			"Good afternoon! I'm from the IRS, investigating possible tax fraud. Can you please verify your name and tax identification number?",
		tag: 'funny',
		character: 'IRS Agent',
		color_from: '#9CDCAA',
		color_to: '#E5E1AB'
	}
] satisfies {
	id: string;
	name: string;
	spanish_name: string;
	objective: string;
	description: string;
	spanish_description: string;
	scenario_info: string;
	character_info: string;
	starting_message: string;
	tag: 'easy' | 'medium' | 'hard' | 'funny';
	character: string;
	color_to: string;
	color_from: string;
}[];
