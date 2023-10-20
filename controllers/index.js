// Tạo mảng lưu trữ dữ liệu nhân viên 
var arrNhanVien = [];

//Thêm nhân viên
document.querySelector('#btnThemNV').onclick = function(e){
    e.preventDefault();

    // Khởi tạo đối tượng nhân viên 
    var nhanVien = new NhanVien();

    //Lấy dữ liệu từ ngừoi nhập
    nhanVien.taiKhoan = document.querySelector('#tknv').value;
    nhanVien.hoTen = document.querySelector('#name').value;
    nhanVien.email = document.querySelector('#email').value;
    nhanVien.matKhau = document.querySelector('#password').value;
    nhanVien.ngayLam = document.querySelector('#datepicker').value;
    nhanVien.luongCoBan = + document.querySelector('#luongCB').value;
    nhanVien.chucVu = document.querySelector('#chucvu').value;
    nhanVien.gioLam = + document.querySelector('#gioLam').value;


    //check validation
    var valid = true;

    valid = checkEmpty(nhanVien.taiKhoan, '#tbTKNV', 'Tài khoản') & checkEmpty(nhanVien.hoTen, '#tbTen', 'Tên nhân viên') & checkEmpty(nhanVien.email, '#tbEmail', 'Email') & checkEmpty(nhanVien.matKhau, '#tbMatKhau', 'Mật khẩu') & checkEmpty(nhanVien.ngayLam, '#tbNgay', 'Ngày làm') & checkEmpty(nhanVien.luongCoBan, '#tbLuongCB', 'Lương cơ bản') & checkEmpty(nhanVien.chucVu, '#tbChucVu', 'Chức vụ') &  checkEmpty(nhanVien.gioLam, '#tbGiolam', 'Giờ làm');


    //validation cho taikhoan
    valid = valid & checkNumber(nhanVien.taiKhoan, '#check-number-tknv', 'Tài khoản') & checkLength(nhanVien.taiKhoan, '#check-length-tknv', 4, 6);


    //validation tennhanvien
    valid = valid & checkCharacter(nhanVien.hoTen, '#check-character-name', 'Tên nhân viên');

    //validation email
    valid = valid & checkEmail(nhanVien.email, '#check-email');

    //validation password
    valid = valid & checkPassword(nhanVien.matKhau, '#check-password');

    //validation luong
    valid = valid & checkValue(nhanVien.luongCoBan, '#check-salary', 1000000, 20000000);

    //validation giolam
    valid = valid & checkValue(nhanVien.gioLam, '#check-time', 80, 200)

    if(valid != true){
        return;
    }


    // Đưa dữ liệu vào mảng 
    arrNhanVien.push(nhanVien);
    
    document.querySelector('#frmQuanLyNhanVien').reset();

    //document.querySelector('.modal-content').style.display = 'none';
    printTableEmployee(arrNhanVien);
    
    saveStorage();
}

//Tạo bảng nhân viên in ra màn hình 
function printTableEmployee(arrNV){
    // input : arr
    // output: str
   var output = '';

   //process
   for (var i = 0; i < arrNV.length; i++){
    var nv = arrNV[i];
    nv.tongLuong = function(){
        var chucVu = this.chucVu;
        switch (chucVu){
            case 'Sếp':{
                return this.luongCoBan * 3;
            }; break;
            case 'Trưởng phòng':{
                return this.luongCoBan * 2;
            }; break;
            case 'Nhân viên':{
                return this.luongCoBan;
            }; break
            default:{
                return 'Chức vụ!';
            }
        }
    }
    nv.xepLoai = function(){
        var gioLam = this.gioLam;
        if(gioLam >= 192){
            return 'Xuất sắc';
        } else if(gioLam < 192 && gioLam >= 176){
            return 'Giỏi'
        } else if(gioLam < 176 && gioLam >= 160){
            return 'Khá'
        } else if(gioLam < 160){
            return 'Trung bình'
        }
    }
    output += 
    `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong()}</td>
            <td>${nv.xepLoai()}</td>
            <td><button class="btn btn-danger" onclick = "deleteEmployee('${nv.taiKhoan}')">Xoá</button>
            <button class="btn btn-primary text-sm" onclick = "updateEmployee('${i}')" data-toggle="modal"
            data-target="#myModal">Chỉnh sửa</button></td>
        </tr>
    `
   }
   document.querySelector('#tableDanhSach').innerHTML = output;
    return output;

}

//Luư dữ liệu vào storage
function saveStorage(){
    var strNhanVien = JSON.stringify(arrNhanVien);
    localStorage.setItem('arrNhanVien', strNhanVien);
}

function getDataStorage(){
    //kiểm tra có dữ liệu trong storage không
    if(localStorage.getItem('arrNhanVien')){
        // Lấy dữ liệu nếu có 
        var str = localStorage.getItem('arrNhanVien');

        // chuyển về obj và ghán vào arr Nhân viên 
        arrNhanVien = JSON.parse(str);

        //tạo lại giao diện 
        printTableEmployee(arrNhanVien);
    }
}

//Xoá nhân viên
function deleteEmployee(taiKhoan){

    
    //Tạo cờ xoá
    var indexDel = -1;

    for(var i = 0; i < arrNhanVien.length; i++){
        if(arrNhanVien[i].taiKhoan === taiKhoan){
            indexDel = i;
            break;
        }
    }
    if(indexDel != -1){
        arrNhanVien.splice(indexDel, 1);

        // Lưu vào storage 
       saveStorage();
    }

    printTableEmployee(arrNhanVien);
}

//Chỉnh sửa, cập nhật thông tin nhân viên
function updateEmployee(indexEdit){

    //khoá button thêm và các input không thể thay đổi
    document.querySelector('#btnThemNV').disabled = true;
    document.querySelector('#tknv').disabled = true;


    //Tạo mảng lưu giá trị của nhân viên tại vị trí cập nhật
    var arrEdit = arrNhanVien[indexEdit];

    // Hiện giá trị tại vị trí cập nhật lên 
    document.querySelector('#tknv').value = arrEdit.taiKhoan;
    document.querySelector('#name').value = arrEdit.hoTen;
    document.querySelector('#email').value = arrEdit.email;
    document.querySelector('#password').value = arrEdit.matKhau;
    document.querySelector('#datepicker').value = arrEdit.ngayLam;
    document.querySelector('#luongCB').value = arrEdit.luongCoBan;
    document.querySelector('#chucvu').value = arrEdit.chucVu;
    document.querySelector('#gioLam').value = arrEdit.gioLam;

    localStorage.setItem('indexEdit', indexEdit);
}

document.querySelector('#btnCapNhat').onclick = function(){
    var nv = new NhanVien();

    nv.taiKhoan = document.querySelector('#tknv').value;
    nv.hoTen = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.matKhau = document.querySelector('#password').value;
    nv.ngayLam = document.querySelector('#datepicker').value;
    nv.luongCoBan = + document.querySelector('#luongCB').value;
    nv.chucVu = document.querySelector('#chucvu').value;
    nv.gioLam = + document.querySelector('#gioLam').value;

    var indexEdit = localStorage.getItem('indexEdit');
    arrNhanVien[indexEdit] = nv;

    printTableEmployee(arrNhanVien);

    saveStorage();

    //mở cập nhật
    document.querySelector('#btnThemNV').disabled = false;
    document.querySelector('#tknv').disabled = false;

    // reset form 
    document.querySelector('#frmQuanLyNhanVien').reset();

    
}

//Tìm nhân viên theo xếp loại
document.querySelector('#searchName').oninput = function(e){
    //Lấy giá trị từ input đầu vào
    var searchXepLoai = e.target.value;

    //Chuyển chuỗi đầu vào thành dạng slug
    searchXepLoai = stringToSlug(searchXepLoai);
    
    //Tạo một mảng chứa giá trị đầu ra
    var output = [];
    //Duyệt mảng
    for(var i = 0; i < arrNhanVien.length; i++){
        var nv = arrNhanVien[i];

        //Chuyển giá trị xếp loại của nhân viên về slug
        var xepLoai = stringToSlug(nv.xepLoai());
        if(xepLoai.search(searchXepLoai) != -1){
            //push obj vào mảng nếu thoả điều kiện
            output.push(nv);
        }
    }

    printTableEmployee(output);
}

document.querySelector('#btnDong').onclick = function(){

    document.querySelector('#btnThemNV').disabled = false;
    document.querySelector('#tknv').disabled = false;

    document.querySelector('#frmQuanLyNhanVien').reset();
}

window.onload = function(){
    getDataStorage();
}