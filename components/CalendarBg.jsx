export default function CalendarBg() {

    let layoutData = []
    let startH = 8;
    
    for (let i = 0; i <= 540; i += 5){
        let time = '';
        let hour = 0;

        if (i === 0) {
            time = `${startH}:00`;
        } else if (!(i % 30)) {
            if (!(i % 60)) {
                hour = startH + i / 60
                time = `${hour}:00`;
            } else {
                hour = startH + Math.floor(i / 60);
                time = `${hour}:30`;
            }
        }
        layoutData.push({key: i, lable: time})
    }
    return (
        <div className="bg__wrapper">
            {layoutData.map((container) => (
                <div key={container.key} className="bg__minutes">
                {/* Здесь может быть ваш контент контейнера */}
                <p>{container.lable}</p>
                </div>
            ))}
        </div>
    )
}