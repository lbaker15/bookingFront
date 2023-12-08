import { http, HttpResponse, rest } from "msw";
import { setupServer } from "msw/node";
const obj = {
	image: false,
	title_one: "Art Events",
	title_two: "&",
	title_three: "Exhibitions",
	gallery: [
		{
			ID: 49,
			id: 49,
			title: "1",
			filename: "1-scaled.jpg",
			filesize: 670009,
			url: "https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/1-scaled.jpg",
			link: "https://headless123321.000webhostapp.com/home/attachment/1/",
			alt: "",
			author: "1",
			description: "",
			caption: "",
			name: "1",
			status: "inherit",
			uploaded_to: 5,
			date: "2023-11-16 19:14:57",
			modified: "2023-11-16 19:16:07",
			menu_order: 0,
			mime_type: "image/jpeg",
			type: "image",
			subtype: "jpeg",
			icon: "https://headless123321.000webhostapp.com/wp-includes/images/media/default.png",
			width: 1805,
			height: 2560,
			sizes: {
				thumbnail:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/1-150x150.jpg",
				"thumbnail-width": 150,
				"thumbnail-height": 150,
				medium:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/1-212x300.jpg",
				"medium-width": 212,
				"medium-height": 300,
				medium_large:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/1-768x1089.jpg",
				"medium_large-width": 768,
				"medium_large-height": 1089,
				large:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/1-722x1024.jpg",
				"large-width": 722,
				"large-height": 1024,
				"1536x1536":
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/1-1083x1536.jpg",
				"1536x1536-width": 1083,
				"1536x1536-height": 1536,
				"2048x2048":
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/1-1444x2048.jpg",
				"2048x2048-width": 1444,
				"2048x2048-height": 2048,
			},
		},
		{
			ID: 50,
			id: 50,
			title: "2",
			filename: "2-scaled.jpg",
			filesize: 778742,
			url: "https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/2-scaled.jpg",
			link: "https://headless123321.000webhostapp.com/home/attachment/2/",
			alt: "",
			author: "1",
			description: "",
			caption: "",
			name: "2",
			status: "inherit",
			uploaded_to: 5,
			date: "2023-11-16 19:15:12",
			modified: "2023-11-16 19:15:12",
			menu_order: 0,
			mime_type: "image/jpeg",
			type: "image",
			subtype: "jpeg",
			icon: "https://headless123321.000webhostapp.com/wp-includes/images/media/default.png",
			width: 1707,
			height: 2560,
			sizes: {
				thumbnail:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/2-150x150.jpg",
				"thumbnail-width": 150,
				"thumbnail-height": 150,
				medium:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/2-200x300.jpg",
				"medium-width": 200,
				"medium-height": 300,
				medium_large:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/2-768x1152.jpg",
				"medium_large-width": 768,
				"medium_large-height": 1152,
				large:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/2-683x1024.jpg",
				"large-width": 683,
				"large-height": 1024,
				"1536x1536":
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/2-1024x1536.jpg",
				"1536x1536-width": 1024,
				"1536x1536-height": 1536,
				"2048x2048":
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/2-1365x2048.jpg",
				"2048x2048-width": 1365,
				"2048x2048-height": 2048,
			},
		},
		{
			ID: 51,
			id: 51,
			title: "joel-filipe-QwoNAhbmLLo-unsplash",
			filename: "joel-filipe-QwoNAhbmLLo-unsplash-scaled.jpg",
			filesize: 842287,
			url: "https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/joel-filipe-QwoNAhbmLLo-unsplash-scaled.jpg",
			link: "https://headless123321.000webhostapp.com/home/joel-filipe-qwonahbmllo-unsplash/",
			alt: "",
			author: "1",
			description: "",
			caption: "",
			name: "joel-filipe-qwonahbmllo-unsplash",
			status: "inherit",
			uploaded_to: 5,
			date: "2023-11-16 19:15:25",
			modified: "2023-11-16 19:15:25",
			menu_order: 0,
			mime_type: "image/jpeg",
			type: "image",
			subtype: "jpeg",
			icon: "https://headless123321.000webhostapp.com/wp-includes/images/media/default.png",
			width: 2026,
			height: 2560,
			sizes: {
				thumbnail:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/joel-filipe-QwoNAhbmLLo-unsplash-150x150.jpg",
				"thumbnail-width": 150,
				"thumbnail-height": 150,
				medium:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/joel-filipe-QwoNAhbmLLo-unsplash-237x300.jpg",
				"medium-width": 237,
				"medium-height": 300,
				medium_large:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/joel-filipe-QwoNAhbmLLo-unsplash-768x971.jpg",
				"medium_large-width": 768,
				"medium_large-height": 971,
				large:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/joel-filipe-QwoNAhbmLLo-unsplash-810x1024.jpg",
				"large-width": 810,
				"large-height": 1024,
				"1536x1536":
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/joel-filipe-QwoNAhbmLLo-unsplash-1215x1536.jpg",
				"1536x1536-width": 1215,
				"1536x1536-height": 1536,
				"2048x2048":
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/joel-filipe-QwoNAhbmLLo-unsplash-1621x2048.jpg",
				"2048x2048-width": 1621,
				"2048x2048-height": 2048,
			},
		},
		{
			ID: 52,
			id: 52,
			title: "susan-wilkinson-xxsPx6dwmmc-unsplash",
			filename: "susan-wilkinson-xxsPx6dwmmc-unsplash-scaled.jpg",
			filesize: 1369365,
			url: "https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/susan-wilkinson-xxsPx6dwmmc-unsplash-scaled.jpg",
			link: "https://headless123321.000webhostapp.com/home/susan-wilkinson-xxspx6dwmmc-unsplash/",
			alt: "",
			author: "1",
			description: "",
			caption: "",
			name: "susan-wilkinson-xxspx6dwmmc-unsplash",
			status: "inherit",
			uploaded_to: 5,
			date: "2023-11-16 19:15:41",
			modified: "2023-11-16 19:15:41",
			menu_order: 0,
			mime_type: "image/jpeg",
			type: "image",
			subtype: "jpeg",
			icon: "https://headless123321.000webhostapp.com/wp-includes/images/media/default.png",
			width: 1707,
			height: 2560,
			sizes: {
				thumbnail:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/susan-wilkinson-xxsPx6dwmmc-unsplash-150x150.jpg",
				"thumbnail-width": 150,
				"thumbnail-height": 150,
				medium:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/susan-wilkinson-xxsPx6dwmmc-unsplash-200x300.jpg",
				"medium-width": 200,
				"medium-height": 300,
				medium_large:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/susan-wilkinson-xxsPx6dwmmc-unsplash-768x1152.jpg",
				"medium_large-width": 768,
				"medium_large-height": 1152,
				large:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/susan-wilkinson-xxsPx6dwmmc-unsplash-683x1024.jpg",
				"large-width": 683,
				"large-height": 1024,
				"1536x1536":
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/susan-wilkinson-xxsPx6dwmmc-unsplash-1024x1536.jpg",
				"1536x1536-width": 1024,
				"1536x1536-height": 1536,
				"2048x2048":
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/susan-wilkinson-xxsPx6dwmmc-unsplash-1365x2048.jpg",
				"2048x2048-width": 1365,
				"2048x2048-height": 2048,
			},
		},
		{
			ID: 53,
			id: 53,
			title: "susan-wilkinson-zCG-k1PZQ3A-unsplash",
			filename: "susan-wilkinson-zCG-k1PZQ3A-unsplash-scaled.jpg",
			filesize: 1099874,
			url: "https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/susan-wilkinson-zCG-k1PZQ3A-unsplash-scaled.jpg",
			link: "https://headless123321.000webhostapp.com/home/susan-wilkinson-zcg-k1pzq3a-unsplash/",
			alt: "",
			author: "1",
			description: "",
			caption: "",
			name: "susan-wilkinson-zcg-k1pzq3a-unsplash",
			status: "inherit",
			uploaded_to: 5,
			date: "2023-11-16 19:15:59",
			modified: "2023-11-16 19:15:59",
			menu_order: 0,
			mime_type: "image/jpeg",
			type: "image",
			subtype: "jpeg",
			icon: "https://headless123321.000webhostapp.com/wp-includes/images/media/default.png",
			width: 1707,
			height: 2560,
			sizes: {
				thumbnail:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/susan-wilkinson-zCG-k1PZQ3A-unsplash-150x150.jpg",
				"thumbnail-width": 150,
				"thumbnail-height": 150,
				medium:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/susan-wilkinson-zCG-k1PZQ3A-unsplash-200x300.jpg",
				"medium-width": 200,
				"medium-height": 300,
				medium_large:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/susan-wilkinson-zCG-k1PZQ3A-unsplash-768x1152.jpg",
				"medium_large-width": 768,
				"medium_large-height": 1152,
				large:
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/susan-wilkinson-zCG-k1PZQ3A-unsplash-683x1024.jpg",
				"large-width": 683,
				"large-height": 1024,
				"1536x1536":
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/susan-wilkinson-zCG-k1PZQ3A-unsplash-1024x1536.jpg",
				"1536x1536-width": 1024,
				"1536x1536-height": 1536,
				"2048x2048":
					"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/susan-wilkinson-zCG-k1PZQ3A-unsplash-1365x2048.jpg",
				"2048x2048-width": 1365,
				"2048x2048-height": 2048,
			},
		},
	],
	image_one: {
		ID: 56,
		id: 56,
		title: "darya-tryfanava-UCNaGWn4EfU-unsplash",
		filename: "darya-tryfanava-UCNaGWn4EfU-unsplash-scaled.jpg",
		filesize: 327598,
		url: "https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/darya-tryfanava-UCNaGWn4EfU-unsplash-scaled.jpg",
		link: "https://headless123321.000webhostapp.com/home/darya-tryfanava-ucnagwn4efu-unsplash/",
		alt: "",
		author: "1",
		description: "",
		caption: "",
		name: "darya-tryfanava-ucnagwn4efu-unsplash",
		status: "inherit",
		uploaded_to: 5,
		date: "2023-11-16 19:19:37",
		modified: "2023-11-16 19:19:37",
		menu_order: 0,
		mime_type: "image/jpeg",
		type: "image",
		subtype: "jpeg",
		icon: "https://headless123321.000webhostapp.com/wp-includes/images/media/default.png",
		width: 2560,
		height: 1707,
		sizes: {
			thumbnail:
				"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/darya-tryfanava-UCNaGWn4EfU-unsplash-150x150.jpg",
			"thumbnail-width": 150,
			"thumbnail-height": 150,
			medium:
				"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/darya-tryfanava-UCNaGWn4EfU-unsplash-300x200.jpg",
			"medium-width": 300,
			"medium-height": 200,
			medium_large:
				"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/darya-tryfanava-UCNaGWn4EfU-unsplash-768x512.jpg",
			"medium_large-width": 768,
			"medium_large-height": 512,
			large:
				"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/darya-tryfanava-UCNaGWn4EfU-unsplash-1024x683.jpg",
			"large-width": 1024,
			"large-height": 683,
			"1536x1536":
				"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/darya-tryfanava-UCNaGWn4EfU-unsplash-1536x1024.jpg",
			"1536x1536-width": 1536,
			"1536x1536-height": 1024,
			"2048x2048":
				"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/darya-tryfanava-UCNaGWn4EfU-unsplash-2048x1365.jpg",
			"2048x2048-width": 2048,
			"2048x2048-height": 1365,
		},
	},
	image_two: {
		ID: 57,
		id: 57,
		title: "praewthida-k-vJejbjXEOxU-unsplash",
		filename: "praewthida-k-vJejbjXEOxU-unsplash-scaled.jpg",
		filesize: 576329,
		url: "https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/praewthida-k-vJejbjXEOxU-unsplash-scaled.jpg",
		link: "https://headless123321.000webhostapp.com/home/praewthida-k-vjejbjxeoxu-unsplash/",
		alt: "",
		author: "1",
		description: "",
		caption: "",
		name: "praewthida-k-vjejbjxeoxu-unsplash",
		status: "inherit",
		uploaded_to: 5,
		date: "2023-11-16 19:19:45",
		modified: "2023-11-16 19:19:45",
		menu_order: 0,
		mime_type: "image/jpeg",
		type: "image",
		subtype: "jpeg",
		icon: "https://headless123321.000webhostapp.com/wp-includes/images/media/default.png",
		width: 2175,
		height: 2560,
		sizes: {
			thumbnail:
				"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/praewthida-k-vJejbjXEOxU-unsplash-150x150.jpg",
			"thumbnail-width": 150,
			"thumbnail-height": 150,
			medium:
				"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/praewthida-k-vJejbjXEOxU-unsplash-255x300.jpg",
			"medium-width": 255,
			"medium-height": 300,
			medium_large:
				"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/praewthida-k-vJejbjXEOxU-unsplash-768x904.jpg",
			"medium_large-width": 768,
			"medium_large-height": 904,
			large:
				"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/praewthida-k-vJejbjXEOxU-unsplash-870x1024.jpg",
			"large-width": 870,
			"large-height": 1024,
			"1536x1536":
				"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/praewthida-k-vJejbjXEOxU-unsplash-1305x1536.jpg",
			"1536x1536-width": 1305,
			"1536x1536-height": 1536,
			"2048x2048":
				"https://headless123321.000webhostapp.com/wp-content/uploads/2023/11/praewthida-k-vJejbjXEOxU-unsplash-1740x2048.jpg",
			"2048x2048-width": 1740,
			"2048x2048-height": 2048,
		},
	},
	closing_text:
		"Come along to one of our networking events. Plenty of opportunities for artists to connect, collaborate, and share ideas.",
	items_moving_text: [
		{
			text: "Contemporary Contemporary Contemporary Contemporary",
		},
		{
			text: "Ceramics Ceramics Ceramics Ceramics",
		},
		{
			text: "Abstract Abstract Abstract Abstract",
		},
	],
	categories: [
		{
			text: "Workshops",
		},
		{
			text: "Networking",
		},
		{
			text: "Exhibitions",
		},
	],
	category_text: "Or feel free to get in touch with any additional enquiries",
	text: [
		{
			row: "We offer a wide range of events.",
		},
		{
			row: "From exhibitions to networking events to workshops for both the professional and beginner.",
		},
	],
};
const url =
	"https://headless123321.000webhostapp.com/wp-json/wp/v2/pages/5/?acf";
const handlers = [
	rest.get(url, (req, res, ctx) => {
		return res(ctx.json({ acf: { ...obj } }));
	}),
];

export const server = setupServer(...handlers);
