import { IChronologyEvent } from "ngx-chronology";
import { ILabel } from "ngx-amap";

declare namespace models {
    export interface signalRState {
        count: number;
        lastMessage: string;
    }
    export interface busInfo {
        id: number;
        samID: string;
        gprS_SAM: string;
        currTime: string;
        lastUpdateTime: Date;
        updateTime: string;
        rwSoftVer: string;
        csnVer: string;
        farVer: string;
        lineNo: string;
        price: string;
        busNo: string;
        sBusNo: string;
        farUpdateFlag: boolean;
        usrUpdateFlag: boolean;
        parUpdateFlag: boolean;
        rwSoftUpdateFlag: boolean;
    }
    export interface GetUserInfoResult {
        userId: string;
        user_ticket: string;
        errcode: number;
    }
    export interface GetUserDetailResult {
        userid: string;
        name: string;
        department: number[];
        errcode: number;
    }
    export interface 调度汇总 {
        name: string;
        stationName: string;
        lineName: string;
        经度: number;
        纬度: number;
        当前站点序号: number;
        站点标识: number;
        站点分类: string;
        进站时间: Date;
        离站时间: Date;
        updateTime: Date;
        type: number;
        gprsId: number;
        onBoardid: number;
        车辆运行状态标识: number;
        运营状态: boolean;
        direction: number;
        is补发包: boolean;
    }
    export interface ChatMessage {
        sent: Date;
        message: string
    }
}

declare namespace server {
    interface entityBase<TKey> {
        id: TKey;
        name: string;
        createTime: Date;
        isDelete: boolean;
    }
    interface busEvent extends entityBase<number> {
        /** 涉及车牌 */
        carNo: string;
        /** 涉及金额 */
        money: number;
        /** 内容描述 */
        content: string;
        /** 填报人 */
        writer: string;
        /** 相关图片 */
        img: string;
        state: eventState;
        eventItems: eventItem[];
    }
    const enum eventState {
        进行中,
        关闭,
    }
    const enum eventItemState {
        审核中,
        通过,
        不通过,
    }
    interface eventItem extends entityBase<number>, IChronologyEvent {
        /** 涉及车牌 */
        carNo: string;
        /** 涉及金额 */
        money: number;
        /** 内容描述 */
        content: string;
        /** 填报人 */
        writer: string;
        /** 审批人 */
        approval: string;
        /** 审批时间 */
        approvalTime: Date;
        /** 相关图片 */
        img: string;
        title: string;
        icon: string;
        faLibrary: string;
        state: eventItemState;
    }
    interface weUIUploadFileResult {
        size: number;
        path: string;
        name: string;
        type: string;
        extName: string;
    }
    interface lineInfo extends entityBase<number> {
        gprsId: number;
        direction: number;
        amapId: string;
    }
    interface packetBase {
        type: any;
        /** GprsId */
        gprsId: number;
        /** 车辆ID */
        onBoardid: number;
        车辆运行状态标识: packetType;
        运营状态: boolean;
        direction: number;
        is补发包: boolean;
    }
    const enum packetType {
        车辆出站 = 0x91,
        车辆进站 = 0x82,
        车辆实时坐标信息 = 0x80,
    }
    interface 车辆实时坐标信息 extends packetBase {
        事件触发时间: Date;
        /** public string 北纬纬度 { get; set; } */
        纬度: number;
        /** public string 东经经度 { get; set; } */
        经度: number;
    }
    interface busMarker {
        /** 车辆ID */
        onBoardid: number;
        marker: number[];
        label: ILabel;
    }
}

declare namespace Json2TS {

    export interface Busline {
        id: string;
        type: string;
        name: string;
        polyline: string;
        citycode: string;
        start_stop: string;
        end_stop: string;
    }

    export interface LineJson {
        status: string;
        info: string;
        infocode: string;
        count: string;
        buslines: Busline[];
    }

    export interface Line {
        gprsId: number;
        direction: number;
    }
}