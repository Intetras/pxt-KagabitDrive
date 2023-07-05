namespace kagabitdrive {

    export enum direction {
        //% block="前"
        Forward = 1,
        //% block="後"
        Back = 0
    }

    export enum brakeValue {
        //% block="急ブレーキ"
        On = 1,
        //% block="ゆっくりブレーキ"
        Off = 0
    }

    let nowPower = [0, 0];
    let nowBrake = brakeValue.Off
    DoubleMotor(0, 0);

    //% group="ロボットカー制御"
    //% blockId="double_DCmotorAnalog_time"
    //% block="Lモーターの強さ %powerL Rモーターの強さ %powerR で %msec　秒動く"
    //% powerR.min=-1023 powerR.max=1023
    //% powerL.min=-1023 powerL.max=1023
    //% msec.min=0
    export function DoubleMotorTime(powerL: number, powerR: number, sec: number) {

        if (sec < 0) {
            sec = 0
        }
        let msec = sec * 1000
        LmotorA(powerL)
        RmotorA(powerR)
        basic.pause(msec)
        LmotorA(0)
        RmotorA(0)
    }

    //% group="ロボットカー制御"
    //% blockId="double_DCmotorAnalog_stop"
    //% block="モーター制御 停止"
    export function DoubleMotorStop(){
        LmotorA(0)
        RmotorA(0)
    }

    //% group="DCモーター"
    //% blockId=R_DCmotorAnalog
    //% block="モーター制御 Rモーター%powerR"
    //% powerR.min=-1023 powerR.max=1023
    export function RmotorA(powerR: number) {

        if (powerR > 1023){
            powerR = 1023
        } else if (powerR < -1023){
            powerR = -1023
        }

        if (powerR > 0) {
            pins.digitalWritePin(DigitalPin.P15, direction.Forward);
            pins.analogWritePin(AnalogPin.P16, Math.abs(powerR));
        } else if (powerR < 0) {
            pins.digitalWritePin(DigitalPin.P15, direction.Back);
            pins.analogWritePin(AnalogPin.P16, Math.abs(powerR));
        } else {
            //停止
            if (nowBrake == brakeValue.On) {
                //ブレーキ処理Onの場合
                if (nowPower[1] > 0) {
                    pins.digitalWritePin(DigitalPin.P15, direction.Back);
                    pins.analogWritePin(AnalogPin.P16, Math.abs(nowPower[1]));
                    basic.pause(30);
                } else if (nowPower[1] < 0) {
                    pins.digitalWritePin(DigitalPin.P15, direction.Forward);
                    pins.analogWritePin(AnalogPin.P16, Math.abs(nowPower[1]));
                    basic.pause(30);
                }
            }

            pins.analogWritePin(AnalogPin.P16, 0);

        }
        nowPower[1] = powerR;

    }

    //% group="DCモーター"
    //% blockId=L_DCmotorAnalog
    //% block="モーター制御 Lモーター%powerL"
    //% powerL.min=-1023 powerL.max=1023
    export function LmotorA(powerL: number) {

        if (powerL > 1023) {
            powerL = 1023
        } else if (powerL < -1023) {
            powerL = -1023
        }

        if (powerL > 0) {
            pins.digitalWritePin(DigitalPin.P13, direction.Forward);
            pins.analogWritePin(AnalogPin.P14, Math.abs(powerL));
        } else if (powerL < 0) {
            pins.digitalWritePin(DigitalPin.P13, direction.Back);
            pins.analogWritePin(AnalogPin.P14, Math.abs(powerL));
        } else {
            //停止
            if (nowBrake == brakeValue.On) {
                if (nowPower[0] > 0) {
                    pins.digitalWritePin(DigitalPin.P13, direction.Back);
                    pins.analogWritePin(AnalogPin.P14, Math.abs(nowPower[0]));
                    basic.pause(30);
                } else if (nowPower[0] < 0) {
                    pins.digitalWritePin(DigitalPin.P13, direction.Forward);
                    pins.analogWritePin(AnalogPin.P14, Math.abs(nowPower[0]));
                    basic.pause(30);
                }
            }
            pins.analogWritePin(AnalogPin.P14, 0);

        }

        nowPower[0] = powerL;

    }

    //% group="DCモーター"
    //% blockId="Double_DCmotorAnalog"
    //% block="モーター制御 Lモーター %powerL Rモーター %powerR"
    //% powerL.min=-1023 powerL.max=1023
    //% powerR.min=-1023 powerR.max=1023
    export function DoubleMotor(powerL: number, powerR: number) {

        LmotorA(powerL)
        RmotorA(powerR)

    }

    
    
    //% group="DCモーター"
    //% blockId="Set_brake"
    //% block="停まり方 %brake"
    export function setBrake(brake: brakeValue) {
        nowBrake = brake;
        //basic.showNumber(nowBrake)
    }

    //% group="サーボモーター"
    //% blockId=R_Servo_Angle block="Rサーボの角度%angle"
    //% angle.min=0 angle.max=180
    export function RServoAngle(angle: number) {

        pins.servoWritePin(AnalogPin.P9, angle)
    }

    //% group="サーボモーター"
    //% blockId=L_Servo_Angle block="Lサーボの角度%angle"
    //% angle.min=0 angle.max=180
    export function LServoAngle(angle: number) {

        pins.servoWritePin(AnalogPin.P7, angle)
    }

}
