//% weight=30 icon="\uf1b9" color=#000080 block="KAGA:bit-Drive"
namespace kagabitdrive {

    export enum direction {
        //% block="前"
        Forward = 1,
        //% block="後"
        Back = 0
    }

    
    DoubleMotor(0, 0);

    //% group="ロボットカー制御"
    //% blockId="double_DCmotorAnalog_time2"
    //% block="モーターの強さ L %powerL R %powerR で %sec 秒動く"
    //% powerR.min=-1023 powerR.max=1023
    //% powerL.min=-1023 powerL.max=1023
    //% sec.min=0
    export function DoubleMotorTime2(powerL: number, powerR: number, sec: number) {

        if (sec < 0) {
            sec = 0
        }
        let msec = sec * 1000

        DoubleMotorTime(powerL,powerR,msec)

    }

    //% group="ロボットカー制御"
    //% blockId="double_DCmotorAnalog_time"
    //% block="1モーターの強さ L %powerL R %powerR で %msec ミリ秒動く"
    //% powerR.min=-1023 powerR.max=1023
    //% powerL.min=-1023 powerL.max=1023
    //% msec.min=0
    export function DoubleMotorTime(powerL: number, powerR: number, msec: number) {

        LmotorA(powerL * 0.7)
        RmotorA(powerR * 0.7)
        basic.pause(20)

        LmotorA(powerL * 0.8)
        RmotorA(powerR * 0.8)
        basic.pause(20)

        LmotorA(powerL * 0.9)
        RmotorA(powerR * 0.9)
        basic.pause(20)

        LmotorA(powerL)
        RmotorA(powerR)
        basic.pause(msec)

        LmotorA(powerL * 0.9)
        RmotorA(powerR * 0.9)
        basic.pause(20)

        LmotorA(powerL * 0.8)
        RmotorA(powerR * 0.8)
        basic.pause(20)

        LmotorA(powerL * 0.7)
        RmotorA(powerR * 0.7)
        basic.pause(20)

        LmotorA(0)
        RmotorA(0)
        basic.pause(20)
    }

    //% group="DCモーター"
    //% blockId="sleep_sec"
    //% block="%msec 秒待つ"
    //% msec.min=0
    export function SleepSec(sec: number) {
        let msec3 = sec * 1000
        basic.pause(msec3)
    }

    //% group="DCモーター"
    //% blockId=R_DCmotorAnalog
    //% block="モーターの強さ R %powerR"
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

            pins.analogWritePin(AnalogPin.P16, 0);

        }
        

    }

    //% group="DCモーター"
    //% blockId=L_DCmotorAnalog
    //% block="モーターの強さ L %powerL"
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
            
            pins.analogWritePin(AnalogPin.P14, 0);

        }

    }

    //% group="DCモーター"
    //% blockId="Double_DCmotorAnalog"
    //% block="モーターの強さ L %powerL R %powerR"
    //% powerL.min=-1023 powerL.max=1023
    //% powerR.min=-1023 powerR.max=1023
    export function DoubleMotor(powerL: number, powerR: number) {

        LmotorA(powerL)
        RmotorA(powerR)

    }

    //% group="サーボモーター"
    //% blockId=R_Servo_Angle block="サーボの角度 R %angle"
    //% angle.min=0 angle.max=180
    export function RServoAngle(angle: number) {

        pins.servoWritePin(AnalogPin.P9, angle)
    }

    //% group="サーボモーター"
    //% blockId=L_Servo_Angle block="サーボの角度 L %angle"
    //% angle.min=0 angle.max=180
    export function LServoAngle(angle: number) {

        pins.servoWritePin(AnalogPin.P7, angle)
    }

}
