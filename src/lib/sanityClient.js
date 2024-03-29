
const PROJECT_ID='iwi3amti'
const DATASET='production'

export function createURL (type) {
  let QUERY = encodeURIComponent(`*[_type == "${type}"]`);
  let url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
  return url;
}


export function createURLById(type, itemId) {
  let QUERY = encodeURIComponent(`*[_type == "${type}" && _id == "${itemId}"]`);
  let url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
  return url;
}


export function grabImage (source) {
    const link = source.asset._ref.slice(6, source.asset._ref.lastIndexOf('-'));
    const filetype = source.asset._ref.slice(source.asset._ref.lastIndexOf('-') + 1, source.asset._ref.length);
    let url =  `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${link}.${filetype}`;
    return url;
}


export const grabFile = (source) => {
  const ref = source.asset._ref;
  const link = ref.slice(ref.indexOf('-') + 1, ref.lastIndexOf('-'));
  return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${link}.pdf`;
}


export async function getData(url) {
  const res = await fetch(url, {next: {revalidate: 300}});
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json();
}
