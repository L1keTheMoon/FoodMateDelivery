import useHttp from '../hooks/useHttp'

interface serverMeal {
  idMeal: string,
  strMeal: string,
  strMealThumb: string
}

function useAPIServices(startLoading: boolean) {
  const { loading, setLoading, error, setError } = useHttp(startLoading);

  const _apiBase = 'https://www.themealdb.com/api/json/v1/1/';

  async function getResources<T>(url: string): Promise<T | undefined> {
    setLoading(true);
    setError(false);
    try {
      let res = await fetch(url);
      if (!res.ok) {
        setError(true);
        throw new Error('Could not find ' + url + ', status: ' + res.status);
      } else {
        setError(false);
      }
      const data = await res.json();
      setLoading(false);
      return data
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  async function getMeals(country: string) {
    let res = await getResources<{ meals: serverMeal[] }>(_apiBase + 'filter.php?a=' + country);
    if (res && res.meals) {
      return res.meals.map(({ idMeal, strMeal, strMealThumb }) => {
        return {
          id: idMeal,
          name: strMeal,
          image: strMealThumb,
          price: ((Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000) / 100).toFixed(2),
        }
      });
    } else {
      setError(true);
    }
  }

  return { loading, error, getMeals }
}

export default useAPIServices;