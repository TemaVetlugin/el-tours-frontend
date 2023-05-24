export const Geolocation = new class {
    getPosition = async (): Promise<GeolocationCoordinates | null> => {
        if (!('geolocation' in navigator)) {
            return null;
        }
        return new Promise((resolve) =>
            navigator.geolocation.getCurrentPosition((data) => {
                resolve(data.coords);
            }, () => {
                resolve(null);
            })
        );
    }
}
