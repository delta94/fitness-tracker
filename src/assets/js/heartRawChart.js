import { changeStatusHeart } from './changeStatusHeart';

const dataHeart = [];

const Chart = new CanvasJS.Chart("ChartContainer", {
    zoomEnabled: true, // Dùng thuộc tính có thể zoom vào graph
    title: {
        text: "HEART BEAT GRAPH" // Viết tiêu đề cho graph
    },
    toolTip: { // Hiển thị truường trên graph
        shared: true
    },
    axisX: {
        title: "chart updates every 2 secs" // Chú thích cho trục X
    },
    data: [{
        type: "line", // Chọn kiểu dữ liệu đường
        xValueType: "dateTime", // Cài đặt kiểu giá trị tại trục X là thuộc tính thời gian
        showInLegend: true, // Hiển thị "temp" ở mục chú thích (legend items)
        name: "heart beat",
        dataPoints: dataHeart // Dữ liệu hiển thị sẽ lấy từ data
    }],
});

let yHeartVal = 0; // Biến lưu giá trị nhip tim theo trục Y
// const updateInterval = 2000;
const time = new Date(); // Lấy thời gian hiện tại

export const updateChart = function(data) {
    const updateInterval = 2000;
    // Gán giá trị từ localhost:8000/get vào textbox để hiển thị bước đi, calo
    const fat_gramms    =   document.getElementById("fat_gramms");
    const meters        =   document.getElementById("meters");
    const steps         =   document.getElementById("steps");
    const callories     =   document.getElementById("callories");
    const heart_rate    =   document.getElementById("heart_rate");

    //recieve data from server
    heart_rate.value    =   data.heart_rate;
    steps.value         =   data.steps;
    callories.value     =   data.callories;
    meters.value        =   data.meters;
    fat_gramms.value    =   data.fat_gramms;

    changeStatusHeart();

    // Xuất ra màn hình console trên browser giá trị nhận được từ localhost:8000/get
    time.setTime(time.getTime() + updateInterval);
    // yHeartVal = parseInt(Math.round((0+200)*150)/100);
    yHeartVal = data.heart_rate;
    dataHeart.push({ // cập nhât dữ liệu mới từ server
        x: time.getTime(),
        y: yHeartVal
    });

    Chart.render(); // chuyển đổi dữ liệu của của graph thành mô hình đồ họa
};