export const geolocation = async (): Promise<GeolocationCoordinates | null> => {
    if (!('geolocation' in navigator)) {
        return null;
    }
    return new Promise((resolve) =>
        navigator.geolocation.getCurrentPosition((data) => {
            resolve(data.coords);
        }, () => {
            resolve(null);
        }, {
            enableHighAccuracy: true
        })
    );
}
