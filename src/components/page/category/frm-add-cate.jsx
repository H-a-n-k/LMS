import { useState } from "react";
import DialogWrapper from "../../shared/dialog-wrapper"
import CallApi from "../../../utils/callApi";

const FrmAddCate = ({setShow, item, setRefresh}) => { 

    const [name, setName] = useState(item && item.cate_name || '');

    const Exit = () => { 
        setShow(false);
    }

    const refresh = () => { 
        setRefresh(x => !x);
    }

    //action = 1: add, 2: update, 3: delete
    const onConfirm = async (action) => {
        try {
            switch (action) { 
                case 1:
                    await CallApi.post('/category/add', { name })
                    break;
                case 2:
                    await CallApi.post('/category/update/' + item.cate_id, { name });
                    break;
                case 3:
                    await CallApi.put('/category/delete/' + item.cate_id);
                    break;
                default: return;

            }
            alert('Thành công!');
            refresh();
            Exit();
        } catch (err) {
            alert('Có lỗi xảy ra')
            console.log('failed: ', err)
        }
    }

    const keyDown = (e) => { 
        if (e.key === 'Enter') { 
            if (item && item.cate_id) onConfirm(2);
            else onConfirm(1);
            return;
        }
    }

    return <DialogWrapper onClickOut={Exit}>
        <div className="add-dialog">
            <label>
                {(item && item.cate_id) ?<span>Cập nhật</span> : <span>Thêm</span>} thể loại: <br />
                <input type='text' placeholder="tên thể loại" autoFocus={true}
                    value={name} onKeyDown={(e) => { keyDown(e) }} onChange={(e) => {setName(e.target.value)}} />
            </label>
            <div className="btns">
                <div className="btn pill cancel" onClick={Exit}>Hủy</div>
                {
                    // eslint-disable-next-line
                    (item && item.cate_id != null) ? <>
                        <div className="btn pill delete" onClick={() => { onConfirm(3) }}>Xóa</div>
                        <div className="btn pill" onClick={() => { onConfirm(2) }}>Cập Nhật</div>
                    </> : <div className="btn pill" onClick={() => { onConfirm(1) }}>Thêm</div>
                }
            </div>
        </div>
    </DialogWrapper>
}

export default FrmAddCate;