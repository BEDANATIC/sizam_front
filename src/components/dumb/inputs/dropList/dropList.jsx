import './dropList.sass';

function DropList(props) {
    const {variants, onChanged} = props;
    return (
        <select className='dropList' onChange={e => onChanged(e.target.value)}>
            {variants.map((item, idx) => <option value={idx}>{item}</option>)}
        </select>
    );
}

export { DropList };
