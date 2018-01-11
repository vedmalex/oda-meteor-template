function url_base64_decode(str) {
  var output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw new Error('Illegal base64url string!');
  }
  var result = window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
  try {
    return decodeURIComponent(escape(result));
  } catch (err) {
    return result;
  }
}

export default function decode(base64json) {
  var json = null, error = null;
  try {
    json = url_base64_decode(base64json);
    json = JSON.stringify(JSON.parse(json), undefined, 2);
  } catch (e) {
    error = e;
  }
  return { result: json, error: error };
};