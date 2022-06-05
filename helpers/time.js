export function getElapsedTime(d) {
    const epochTime = new Date(d).getTime();
    const now = new Date().getTime();
    // convert to seconds
    let elapsed = now - epochTime;
    elapsed = Math.floor(elapsed / 1000);
    let unit = 'm';

    if (elapsed > 3600) {
        unit = 'H';
    }

    if (elapsed > 86400) {
        unit = 'D';
    }

    if (elapsed > 604800) {
        unit = 'W';
    }

    if (elapsed > 2592000) {
        unit = 'M';
    }

    switch (unit) {
        case 'H':
            elapsed /= 3600;
            break;
        case 'D':
            elapsed /= 86400;
            break;
        case 'W':
            elapsed /= 604800;
            break;
        case 'M':
            elapsed /= 2592000;
            break;
        default:
            elapsed /= 60;
            break;
    }

    if (elapsed < 1) {
        return 'Just now';
    }

    if (elapsed * 60 > 2592000 * 12) {
        return new Date(d).toLocaleDateString('en-us', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    }

    return `${Math.floor(elapsed)}${unit} ago`;
}
