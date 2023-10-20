function NhanVien(){
    this.taiKhoan = '';
    this.hoTen = '';
    this.email = '';
    this.matKhau = '';
    this.ngayLam = '';
    this.luongCoBan = 0;
    this.chucVu = '';
    this.gioLam = 0;
    this.tongLuong = function(){
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
                return 'Bạn phải chọn chức vụ!';
            }
        }
    }
    this.xepLoai = function(){
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
}