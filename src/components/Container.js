import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Container() {

    const [records, setRecords] = useState([]);
    const [newDate, setNewDate] = useState({ date: '', km: 0 });

    const handleChangeData = el => {
        const { name, value } = el.target;
        setNewDate(prev => {
            return { ...prev, [name]: value }
        })
    }

    const handleRemove = (id) => {
        setRecords((prev) => prev.filter((record) => record.id !== id))
    };

    const handleSubmit = (el) => {
        el.preventDefault();

        setRecords((prev) => {
            let recordsEdit;

            if (prev.findIndex((record) => record.date === newDate.date) !== -1) {
                recordsEdit = prev.map((record) => {
                    return record.date === newDate.date
                        ? { ...record, km: record.km + Number(newDate.km) } : record;
                });
            } else {
                recordsEdit = [
                    ...prev, { id: uuidv4(), date: newDate.date, km: Number(newDate.km) },
                ];
            }

            recordsEdit.sort((a, b) => {
                if (a.date < b.date) {
                    return 1;
                } else if (a.date > b.date) {
                    return -1;
                } else return 0;
            });

            return recordsEdit;
        });
    };

    const dateFormat = (date) =>{
        const d = new Date(date);
        return d.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
    }

    return (
        <div className="Container">
            <form className="newInfoInput" onSubmit={handleSubmit}> 
                <div className="newInfoInput-date">
                    <label className="newInfoInput-date-label colWidth" htmlFor="date">Дата (ДД.ММ.ГГ)</label>
                    <input className="newInfoInput-date-input colWidth" name="date" required type="date" onChange={handleChangeData} />
                </div>
                <div className="newInfoInput-km">
                    <label className="newInfoInput-km-label colWidth" htmlFor="km">Пройдено км</label>
                    <input className="newInfoInput-km-input colWidth" name="km" type="number" min="0" required  onChange={handleChangeData} />
                </div>
                <button className="newInfoInput-submit" type="submit">ОК</button>
            </form>
            <div className="table">
                <div className="tableHead">
                    <div className="tableHead-date colWidth">Дата (ДД.ММ.ГГ)</div>
                    <div className="tableHead-km colWidth">Пройдено км</div>
                    <div className="tableHead-actions">Действия</div>
                </div>
                <div className="tableInfo">
                    {records.map((record) => (
                        <div className="tableItem" key={record.id}>
                            <div className="tableItem-date colWidth">{dateFormat(record.date)}</div>
                            <div className="tableItem-km colWidth">{record.km.toFixed(1)}</div>
                            <div className="tableItem-actions">
                                <button className="tableItem-edit btn"></button>
                                <button className="tableItem-remove btn" onClick={() => handleRemove(record.id)}></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}



