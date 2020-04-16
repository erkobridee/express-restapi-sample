const url = require('url')
const got = require('got');
const cheerio = require('cheerio');

const trimValue = str => str ? str.trim() : '';

const extractHeaderMetaNameContent = metaName => $ => trimValue($(`head meta[name="${metaName}"]`).attr('content'));

const extractHeaderMetaPropertyContent = metaProperty => $ => trimValue($(`head meta[property="${metaProperty}"]`).attr('content'));

const extractHeaderTagContent = (tagName = 'title') => $ => trimValue($(`head ${tagName}`).text());

const extractHeaderInfo = $ => ({
  page: {
    title: extractHeaderTagContent('title')($),
    description: extractHeaderMetaNameContent('description')($),
    generator: extractHeaderMetaNameContent('generator')($),
		author: extractHeaderMetaNameContent('author')($),
		keywords: extractHeaderMetaNameContent('keywords')($)
  },
    
  twitter: {
    card: extractHeaderMetaNameContent('twitter:card')($),
    site: extractHeaderMetaNameContent('twitter:site')($),
    title: extractHeaderMetaNameContent('twitter:title')($),
    description: extractHeaderMetaNameContent('twitter:description')($),
		creator: extractHeaderMetaNameContent('twitter:creator')($),
		image: extractHeaderMetaNameContent('twitter:image')($),
  },

  og: {
    title: extractHeaderMetaPropertyContent('og:title')($),
    description: extractHeaderMetaPropertyContent('og:description')($),
    type: extractHeaderMetaPropertyContent('og:type')($),
		url: extractHeaderMetaPropertyContent('og:url')($),
		image: extractHeaderMetaPropertyContent('og:image')($),
		site_name: extractHeaderMetaPropertyContent('og:site_name')($),
		locale: extractHeaderMetaPropertyContent('og:locale')($),
  },
});

const loadAndExtract = async url => {
	const response = await got(url);
	const $ = cheerio.load(response.body);

	return extractHeaderInfo($);
};

const extractFromUrl = value => {
	const parsedUrl = new URL(value);
	const { hostname, origin } = parsedUrl;

	return {
		url: {
			hostname,
			origin
		}
	};
}

const extractPageInfo = async urlStr => ({
	...extractFromUrl(urlStr),
	...(await loadAndExtract(urlStr))
});

const isURL = str => {
	// see on: Regulex - JavaScript Regular Expression Visualizer
	// https://bit.ly/2RFWM6D
	const urlRegex = /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/i;
	return str.length < 2083 && urlRegex.test(str);
};

module.exports = {
	isURL,
	extractPageInfo
};