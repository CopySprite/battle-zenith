namespace SpriteKind {
    export const Melee1 = SpriteKind.create()
    export const P1_Wildfire = SpriteKind.create()
    export const Player2 = SpriteKind.create()
    export const Projectile2 = SpriteKind.create()
    export const Melee2 = SpriteKind.create()
    export const P2_Wildfire = SpriteKind.create()
    export const Shield1 = SpriteKind.create()
    export const Shield2 = SpriteKind.create()
    export const Strike1 = SpriteKind.create()
    export const Strike2 = SpriteKind.create()
    export const Blast1 = SpriteKind.create()
    export const Blast2 = SpriteKind.create()
    export const Bolt1 = SpriteKind.create()
    export const Bolt2 = SpriteKind.create()
    export const Shadow1 = SpriteKind.create()
    export const Shadow2 = SpriteKind.create()
}
namespace StatusBarKind {
    export const Health2 = StatusBarKind.create()
    export const Magic2 = StatusBarKind.create()
}
function P2_Attack_Animation () {
	
}
sprites.onOverlap(SpriteKind.Shield1, SpriteKind.P2_Wildfire, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    HP2.value += -1
})
sprites.onOverlap(SpriteKind.Shield2, SpriteKind.Melee1, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    HP1.value += -10
})
function P2_Start () {
    myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Taser", assets.image`Taser`),
    miniMenu.createMenuItem("Rift + Rouge", assets.image`Rift and Rouge`),
    miniMenu.createMenuItem("Danger Kitty", assets.image`Danger_Kitty`),
    miniMenu.createMenuItem("RedSprite", assets.image`RedSprite`),
    miniMenu.createMenuItem("Alpha", assets.image`Alpha`),
    miniMenu.createMenuItem("Astro", assets.image`Astro`),
    miniMenu.createMenuItem("???", assets.image`Boshi_`),
    miniMenu.createMenuItem("???", assets.image`Hyper_`),
    miniMenu.createMenuItem("???", assets.image`Fork and Spoon_`),
    miniMenu.createMenuItem("???", assets.image`Bits_`)
    )
    myMenu.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Background, 9)
    myMenu.setPosition(158, 198)
    MenuStyle()
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        P2SelectedCharacter = selectedIndex
        P2SelectedCharacter += 1
        if (selectedIndex <= 5) {
            myMenu.close()
            HP2 = statusbars.create(20, 3, StatusBarKind.Health2)
            HP2.setColor(0, 0)
            if (P2SelectedCharacter == 1) {
                Player_2 = sprites.create(assets.image`Taser`, SpriteKind.Player2)
                Taser2()
                controller.player2.moveSprite(Player_2, 42, 42)
                HP2.max = 86
            } else if (P2SelectedCharacter == 2) {
                Player_2 = sprites.create(assets.image`Rift`, SpriteKind.Player2)
                Rift_Or_Rouge2 = 1
                Rift2()
                HP2.max = 63
            } else if (P2SelectedCharacter == 3) {
                Player_2 = sprites.create(assets.image`Danger_Kitty`, SpriteKind.Player2)
                Danger_Kitty2()
                controller.player2.moveSprite(Player_2, 47, 47)
                HP2.max = 80
            } else if (P2SelectedCharacter == 4) {
                Player_2 = sprites.create(assets.image`RedSprite`, SpriteKind.Player2)
                RedSprite2()
                controller.player2.moveSprite(Player_2, 64, 64)
                HP2.max = 41
            } else if (P2SelectedCharacter == 5) {
                Player_2 = sprites.create(assets.image`Alpha`, SpriteKind.Player2)
                Alpha2()
                controller.player2.moveSprite(Player_2, 51, 51)
                HP2.max = 66
            } else if (P2SelectedCharacter == 6) {
                Player_2 = sprites.create(assets.image`Astro`, SpriteKind.Player2)
                characterAnimations.loopFrames(
                Player_2,
                assets.animation`Animate_Astro`,
                150,
                characterAnimations.rule(Predicate.Moving)
                )
                controller.player2.moveSprite(Player_2, 45, 45)
                HP2.max = 70
            }
            Player_2.setFlag(SpriteFlag.Invisible, true)
            tiles.placeOnRandomTile(Player_2, assets.tile`Tile2`)
            Stage_Select()
        } else {
            scene.cameraShake(3, 100)
        }
    })
}
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (TitleScreen == false) {
        if (P2Attack == true) {
            if (P2SelectedCharacter == 1) {
                Taser_Lightning2()
                P2Energy.value += -50
            } else if (P2SelectedCharacter == 2) {
                if (Rift_Or_Rouge2 == 1) {
                    extraEffects.createSpreadEffectOnAnchor(Player_2, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Explosion), 100)
                    Rouge2()
                    Rift_Or_Rouge2 = 2
                    P2Energy.value += -25
                } else if (Rift_Or_Rouge2 == 2) {
                    extraEffects.createSpreadEffectOnAnchor(Player_2, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Explosion), 100)
                    Rift2()
                    Rift_Or_Rouge2 = 1
                    P2Energy.value += -25
                }
            } else if (P2SelectedCharacter == 3) {
                Danger_Kitty_Blast2()
                P2Energy.value += -50
            } else if (P2SelectedCharacter == 5) {
                Alpha_Scarfshot2()
                P2Energy.value += -50
            } else if (P2SelectedCharacter == 6) {
                HP2.value += 10
                P2Energy.value += -42
                extraEffects.createSpreadEffectOnAnchor(Player_2, extraEffects.createSingleColorSpreadEffectData(6, ExtraEffectPresetShape.Explosion), 100)
            }
        }
    }
})
function Danger_Kitty_Blast1 () {
    if (P1Direction == 1) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Blast`, Player_1, 0, -135)
    } else if (P1Direction == 2) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Blast`, Player_1, 0, 135)
    } else if (P1Direction == 3) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Blast`, Player_1, -135, 0)
    } else if (P1Direction == 4) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Blast`, Player_1, 135, 0)
    } else {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Blast`, Player_1, 0, 135)
    }
    extraEffects.createSpreadEffectOnAnchor(Projectile_1, Fire_Effect, 1700, 11)
    animation.runImageAnimation(
    Projectile_1,
    [img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . 3 3 4 4 1 4 4 3 3 . . . 
        . . . 3 4 4 1 1 1 4 4 3 . . . 
        . . . 3 4 1 1 1 1 1 4 3 . . . 
        . . . 3 4 4 1 1 1 4 4 3 . . . 
        . . . 3 3 4 4 1 4 4 3 3 . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . 3 3 3 3 3 3 3 . . . . 
        . . . 3 3 4 4 4 4 4 3 3 . . . 
        . . 3 3 4 4 1 1 1 4 4 3 3 . . 
        . . 3 4 4 1 1 1 1 1 4 4 3 . . 
        . . 3 4 1 1 1 1 1 1 1 4 3 . . 
        . . 3 4 1 1 1 1 1 1 1 4 3 . . 
        . . 3 4 1 1 1 1 1 1 1 4 3 . . 
        . . 3 4 4 1 1 1 1 1 4 4 3 . . 
        . . 3 3 4 4 1 1 1 4 4 3 3 . . 
        . . . 3 3 4 4 4 4 4 3 3 . . . 
        . . . . 3 3 3 3 3 3 3 . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . 3 3 3 3 3 3 3 . . . . 
        . . 3 3 3 4 4 4 4 4 3 3 3 . . 
        . . 3 4 4 4 1 1 1 4 4 4 3 . . 
        . 3 3 4 1 1 1 1 1 1 1 4 3 3 . 
        . 3 4 4 1 1 1 1 1 1 1 4 4 3 . 
        . 3 4 1 1 1 1 1 1 1 1 1 4 3 . 
        . 3 4 1 1 1 1 1 1 1 1 1 4 3 . 
        . 3 4 1 1 1 1 1 1 1 1 1 4 3 . 
        . 3 4 4 1 1 1 1 1 1 1 4 4 3 . 
        . 3 3 4 1 1 1 1 1 1 1 4 3 3 . 
        . . 3 4 4 4 1 1 1 4 4 4 3 . . 
        . . 3 3 3 4 4 4 4 4 3 3 3 . . 
        . . . . 3 3 3 3 3 3 3 . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . 3 3 3 3 3 3 3 3 3 . . . 
        . 3 3 3 4 4 4 4 4 4 4 3 3 3 . 
        . 3 4 4 4 1 1 1 1 1 4 4 4 3 . 
        3 3 4 1 1 1 1 1 1 1 1 1 4 3 3 
        3 4 4 1 1 1 1 1 1 1 1 1 4 4 3 
        3 4 1 1 1 1 1 1 1 1 1 1 1 4 3 
        3 4 1 1 1 1 1 1 1 1 1 1 1 4 3 
        3 4 1 1 1 1 1 1 1 1 1 1 1 4 3 
        3 4 1 1 1 1 1 1 1 1 1 1 1 4 3 
        3 4 1 1 1 1 1 1 1 1 1 1 1 4 3 
        3 4 4 1 1 1 1 1 1 1 1 1 4 4 3 
        3 3 4 1 1 1 1 1 1 1 1 1 4 3 3 
        . 3 4 4 4 1 1 1 1 1 4 4 4 3 . 
        . 3 3 3 4 4 4 4 4 4 4 3 3 3 . 
        . . . 3 3 3 3 3 3 3 3 3 . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `],
    50,
    false
    )
}
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Released, function () {
    if (P2SelectedCharacter == 4) {
        effects.clearParticles(Player_2)
        controller.player2.moveSprite(Player_2, 64, 64)
    }
})
sprites.onOverlap(SpriteKind.Blast2, SpriteKind.Shield1, function (sprite, otherSprite) {
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Explosion), 100, 48)
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Explosion), 100, 48, 8)
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Shield2, SpriteKind.P1_Wildfire, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    HP2.value += -1
})
function RedSprite1 () {
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`RedSprite_Right`,
    200,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`RedSprite_Left`,
    200,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`RedSprite_Up`,
    200,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`RedSprite_Down`,
    200,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`RedSprite_Idle`,
    50,
    characterAnimations.rule(Predicate.NotMoving)
    )
}
statusbars.onStatusReached(StatusBarKind.Magic, statusbars.StatusComparison.LTE, statusbars.ComparisonType.Percentage, 1, function (status) {
    P1Attack = false
    P1Energy.setColor(14, 15)
})
controller.player1.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function () {
    P1Direction = 2
})
statusbars.onStatusReached(StatusBarKind.Magic, statusbars.StatusComparison.GTE, statusbars.ComparisonType.Percentage, 10, function (status) {
    if (P1SelectedCharacter == 4) {
        P1Attack = true
        P1Energy.setColor(10, 15)
    }
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (TitleScreen == false) {
        if (P1Attack == true) {
            if (CanAttack1 == true) {
                CanAttack1 = false
                P1_Attack_Animation()
                characterAnimations.setCharacterAnimationsEnabled(Player_1, false)
                if (P1SelectedCharacter == 1) {
                    Taser_Blast()
                    P1Energy.value += -50
                    timer.after(135, function () {
                        CanAttack1 = true
                        characterAnimations.setCharacterAnimationsEnabled(Player_1, true)
                    })
                } else if (P1SelectedCharacter == 2) {
                    RiftRouge_Attack1()
                    P1Energy.value += -50
                    timer.after(81, function () {
                        CanAttack1 = true
                        characterAnimations.setCharacterAnimationsEnabled(Player_1, true)
                    })
                } else if (P1SelectedCharacter == 3) {
                    Danger_Kitty_Slash1()
                    P1Energy.value += -50
                    timer.after(99, function () {
                        CanAttack1 = true
                        characterAnimations.setCharacterAnimationsEnabled(Player_1, true)
                    })
                } else if (P1SelectedCharacter == 4) {
                    characterAnimations.setCharacterAnimationsEnabled(Player_1, true)
                    CanAttack1 = true
                    if (P1Direction == 1) {
                        Projectile_1 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_1, 0, -88)
                    } else if (P1Direction == 2) {
                        Projectile_1 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_1, 0, 88)
                    } else if (P1Direction == 3) {
                        Projectile_1 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_1, -88, 0)
                    } else if (P1Direction == 4) {
                        Projectile_1 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_1, 88, 0)
                    } else {
                        Player_1 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_1, 0, 88)
                    }
                    Projectile_1.setKind(SpriteKind.P1_Wildfire)
                    animation.runImageAnimation(
                    Projectile_1,
                    assets.animation`RedCircle_Projectile`,
                    50,
                    false
                    )
                    P1Energy.value += -3
                } else if (P1SelectedCharacter == 5) {
                    Alpha_Slash1()
                    P1Energy.value += -50
                    timer.after(75, function () {
                        CanAttack1 = true
                        characterAnimations.setCharacterAnimationsEnabled(Player_1, true)
                    })
                } else if (P1SelectedCharacter == 6) {
                    sprites.destroyAllSpritesOfKind(SpriteKind.Shield1)
                    Projectile_1 = sprites.createProjectileFromSprite(assets.image`Shield`, Player_1, 0, 0)
                    animation.runImageAnimation(
                    Projectile_1,
                    assets.animation`Astral Shield`,
                    100,
                    false
                    )
                    Projectile_1.setKind(SpriteKind.Shield1)
                    Projectile_1.follow(Player_1)
                    P1Energy.value += -50
                    timer.after(460, function () {
                        CanAttack1 = true
                        characterAnimations.setCharacterAnimationsEnabled(Player_1, true)
                    })
                }
            }
        }
    } else {
        TitleScreen = false
        Start()
    }
})
function Rift1 () {
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Rift_Walk_Right`,
    50,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Rift_Walk_Left`,
    50,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Rift_Walk_Up`,
    50,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Rift_Walk_Down`,
    50,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Rift_Idle_Right`,
    256,
    characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Rift_Idle_Left`,
    256,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Rift_Idle_Up`,
    50,
    characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Rift_Idle_Down`,
    256,
    characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving)
    )
    controller.player1.moveSprite(Player_1, 50, 50)
}
sprites.onOverlap(SpriteKind.Shadow2, SpriteKind.Player, function (sprite, otherSprite) {
    HP1.value += -10
    if (P2SelectedCharacter == 8) {
        extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(4, ExtraEffectPresetShape.Explosion), 100, 48, 10)
        extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(1, ExtraEffectPresetShape.Explosion), 100, 48, 8)
    }
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Shield1, SpriteKind.Player2, function (sprite, otherSprite) {
    HP2.value += -2
})
function Alpha_Scarfshot1 () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Blast1)
    if (P1Direction == 1) {
        Scarf1 = sprites.createProjectileFromSprite(assets.image`Alpha_ScarfShot_Up`, Player_1, 0, -100)
    } else if (P1Direction == 2) {
        Scarf1 = sprites.createProjectileFromSprite(assets.image`Alpha_ScarfShot_Down`, Player_1, 0, 100)
    } else if (P1Direction == 3) {
        Scarf1 = sprites.createProjectileFromSprite(assets.image`Alpha_ScarfShot_Left`, Player_1, -100, 0)
    } else if (P1Direction == 4) {
        Scarf1 = sprites.createProjectileFromSprite(assets.image`Alpha_ScarfShot_Right`, Player_1, 100, 0)
    } else {
        Scarf1 = sprites.createProjectileFromSprite(assets.image`Alpha_ScarfShot_Down`, Player_1, 0, 100)
    }
    Scarf1.setKind(SpriteKind.Blast1)
    timer.after(1250, function () {
        Scarf1.setVelocity(0, 0)
        Scarf1.setImage(assets.image`Alpha_Scarfshot`)
    })
}
sprites.onOverlap(SpriteKind.P2_Wildfire, SpriteKind.Player, function (sprite, otherSprite) {
    HP1.value += -3
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Explosion), 100, 48, 1)
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Bolt1, SpriteKind.Shield2, function (sprite, otherSprite) {
    effects.clearParticles(sprite)
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Explosion), 100, 48)
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Explosion), 100, 48, 10)
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(1, ExtraEffectPresetShape.Explosion), 100, 48, 5)
    sprites.destroy(sprite)
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Repeated, function () {
    if (P1Attack == true) {
        if (P1SelectedCharacter == 4) {
            P1Energy.value += -1
            controller.player1.moveSprite(Player_1, 128, 128)
            extraEffects.createSpreadEffectOnAnchor(Player_1, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Spark), 100, 48, 1)
        }
    } else {
        P1Attack = false
        effects.clearParticles(Player_1)
        controller.player1.moveSprite(Player_1, 64, 64)
    }
})
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    P2Direction = 4
})
sprites.onOverlap(SpriteKind.Melee2, SpriteKind.Player, function (sprite, otherSprite) {
    HP1.value += -30
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Shield1, SpriteKind.Melee2, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    HP2.value += -10
})
sprites.onOverlap(SpriteKind.Bolt1, SpriteKind.Player2, function (sprite, otherSprite) {
    HP2.value += -18
    effects.clearParticles(sprite)
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Explosion), 100, 48)
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Explosion), 100, 48, 10)
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(1, ExtraEffectPresetShape.Explosion), 100, 48, 5)
    sprites.destroy(sprite)
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (TitleScreen == false) {
        if (P1Attack == true) {
            if (CanAttack1 == true) {
                CanAttack1 = false
                P1_Attack_Animation()
                characterAnimations.setCharacterAnimationsEnabled(Player_1, false)
                if (P1SelectedCharacter == 1) {
                    Taser_Lightning()
                    P1Energy.value += -50
                    timer.after(100, function () {
                        CanAttack1 = true
                        characterAnimations.setCharacterAnimationsEnabled(Player_1, true)
                    })
                } else if (P1SelectedCharacter == 2) {
                    if (Rift_Or_Rouge == 1) {
                        extraEffects.createSpreadEffectOnAnchor(Player_1, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Explosion), 100)
                        Rift_Or_Rouge = 2
                        Rouge1()
                        P1Energy.value += -25
                    } else if (Rift_Or_Rouge == 2) {
                        extraEffects.createSpreadEffectOnAnchor(Player_1, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Explosion), 100)
                        Rift_Or_Rouge = 1
                        Rift1()
                        P1Energy.value += -25
                    }
                    CanAttack1 = true
                    characterAnimations.setCharacterAnimationsEnabled(Player_1, true)
                } else if (P1SelectedCharacter == 3) {
                    Danger_Kitty_Blast1()
                    P1Energy.value += -50
                    timer.after(120, function () {
                        CanAttack1 = true
                        characterAnimations.setCharacterAnimationsEnabled(Player_1, true)
                    })
                } else if (P1SelectedCharacter == 4) {
                    characterAnimations.setCharacterAnimationsEnabled(Player_1, true)
                } else if (P1SelectedCharacter == 5) {
                    Alpha_Scarfshot1()
                    P1Energy.value += -50
                    timer.after(140, function () {
                        CanAttack1 = true
                        characterAnimations.setCharacterAnimationsEnabled(Player_1, true)
                    })
                } else if (P1SelectedCharacter == 6) {
                    HP1.value += 10
                    P1Energy.value += -42
                    extraEffects.createSpreadEffectOnAnchor(Player_1, extraEffects.createSingleColorSpreadEffectData(6, ExtraEffectPresetShape.Explosion), 100)
                    CanAttack1 = true
                    characterAnimations.setCharacterAnimationsEnabled(Player_1, true)
                }
            }
        }
    }
})
function Start () {
    sprites.destroy(Title)
    tiles.setCurrentTilemap(tilemap`Start_Stage`)
    myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Taser", assets.image`Taser`),
    miniMenu.createMenuItem("Rift + Rouge", assets.image`Rift and Rouge`),
    miniMenu.createMenuItem("Danger Kitty", assets.image`Danger_Kitty`),
    miniMenu.createMenuItem("RedSprite", assets.image`RedSprite`),
    miniMenu.createMenuItem("Alpha", assets.image`Alpha`),
    miniMenu.createMenuItem("Astro", assets.image`Astro`),
    miniMenu.createMenuItem("???", assets.image`Boshi_`),
    miniMenu.createMenuItem("???", assets.image`Hyper_`),
    miniMenu.createMenuItem("???", assets.image`Fork and Spoon_`),
    miniMenu.createMenuItem("???", assets.image`Bits_`)
    )
    myMenu.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Background, 2)
    myMenu.setPosition(158, 198)
    MenuStyle()
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        P1SelectedCharacter = selectedIndex
        P1SelectedCharacter += 1
        if (selectedIndex <= 5) {
            myMenu.close()
            HP1 = statusbars.create(20, 3, StatusBarKind.Health)
            HP1.setColor(0, 0)
            if (P1SelectedCharacter == 1) {
                Player_1 = sprites.create(assets.image`Taser`, SpriteKind.Player)
                Taser1()
                controller.player1.moveSprite(Player_1, 42, 42)
                HP1.max = 86
            } else if (P1SelectedCharacter == 2) {
                Player_1 = sprites.create(assets.image`Rift`, SpriteKind.Player)
                Rift_Or_Rouge = 1
                Rift1()
                HP1.max = 63
            } else if (P1SelectedCharacter == 3) {
                Player_1 = sprites.create(assets.image`Danger_Kitty`, SpriteKind.Player)
                Danger_Kitty1()
                controller.player1.moveSprite(Player_1, 47, 47)
                HP1.max = 80
            } else if (P1SelectedCharacter == 4) {
                Player_1 = sprites.create(assets.image`RedSprite`, SpriteKind.Player)
                RedSprite1()
                controller.player1.moveSprite(Player_1, 64, 64)
                HP1.max = 41
            } else if (P1SelectedCharacter == 5) {
                Player_1 = sprites.create(assets.image`Alpha`, SpriteKind.Player)
                Alpha1()
                controller.player1.moveSprite(Player_1, 51, 51)
                HP1.max = 66
            } else if (P1SelectedCharacter == 6) {
                Player_1 = sprites.create(assets.image`Astro`, SpriteKind.Player)
                characterAnimations.loopFrames(
                Player_1,
                assets.animation`Animate_Astro`,
                150,
                characterAnimations.rule(Predicate.Moving)
                )
                controller.player1.moveSprite(Player_1, 45, 45)
                HP1.max = 70
            }
            Player_1.setFlag(SpriteFlag.Invisible, true)
            tiles.placeOnRandomTile(Player_1, assets.tile`Tile1`)
            P2_Start()
        } else {
            scene.cameraShake(3, 100)
        }
    })
}
function Danger_Kitty2 () {
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Danger_Kitty_Walk_Right`,
    64,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Danger_Kitty_Walk_Left`,
    64,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Danger_Kitty_Walk_Up`,
    64,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Danger_Kitty_Walk_Down`,
    64,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Danger_Kitty_Idle_Right`,
    64,
    characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Danger_Kitty_Idle_Left`,
    64,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Danger_Kitty_Idle_Up`,
    64,
    characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Danger_Kitty_Idle_Down`,
    64,
    characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving)
    )
}
function Alpha2 () {
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Alpha_Walk_Right`,
    50,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Alpha_Walk_Left`,
    50,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Alpha_Walk_Up`,
    50,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Alpha_Walk_Down`,
    50,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Alpha_Idle_Right`,
    50,
    characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Alpha_Idle_Left`,
    50,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Alpha_Idle_Up`,
    50,
    characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Alpha_Idle_Down`,
    50,
    characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving)
    )
}
sprites.onOverlap(SpriteKind.Projectile2, SpriteKind.Player, function (sprite, otherSprite) {
    HP1.value += -20
    if (P2SelectedCharacter == 2) {
        extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(12, ExtraEffectPresetShape.Explosion), 100, 48, 6)
        extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(10, ExtraEffectPresetShape.Explosion), 100, 48, 5)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shadow2)
    } else {
        extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(3, ExtraEffectPresetShape.Explosion), 100, 48, 10)
        extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(4, ExtraEffectPresetShape.Explosion), 100, 48, 10)
        extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(1, ExtraEffectPresetShape.Explosion), 100, 48, 5)
    }
    sprites.destroy(sprite)
})
function Alpha1 () {
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Alpha_Walk_Right`,
    50,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Alpha_Walk_Left`,
    50,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Alpha_Walk_Up`,
    50,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Alpha_Walk_Down`,
    50,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Alpha_Idle_Right`,
    50,
    characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Alpha_Idle_Left`,
    50,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Alpha_Idle_Up`,
    50,
    characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Alpha_Idle_Down`,
    50,
    characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving)
    )
}
controller.player1.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    P1Direction = 3
})
controller.player1.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    P1Direction = 1
})
statusbars.onStatusReached(StatusBarKind.Health2, statusbars.StatusComparison.LTE, statusbars.ComparisonType.Percentage, 0, function (status) {
    Player_2.setKind(SpriteKind.Enemy)
    Player2Dead = true
    HP2.setColor(0, 0)
    P2Energy.setColor(0, 0)
    characterAnimations.setCharacterAnimationsEnabled(Player_2, false)
    game.splash("Player 1 Wins!")
    game.reset()
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (TitleScreen == false) {
        if (P2Attack == true) {
            if (P2SelectedCharacter == 1) {
                Taser_Blast2()
                P2Energy.value += -50
            } else if (P2SelectedCharacter == 2) {
                RiftRouge_Attack2()
                P2Energy.value += -50
            } else if (P2SelectedCharacter == 3) {
                Danger_Kitty_Slash2()
                P2Energy.value += -50
            } else if (P2SelectedCharacter == 4) {
                if (P2Direction == 1) {
                    Projectile_2 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_2, 0, -88)
                } else if (P2Direction == 2) {
                    Projectile_2 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_2, 0, 88)
                } else if (P2Direction == 3) {
                    Projectile_2 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_2, -88, 0)
                } else if (P2Direction == 4) {
                    Projectile_2 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_2, 88, 0)
                } else {
                    Projectile_2 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_2, 0, 88)
                }
                Projectile_2.setKind(SpriteKind.P2_Wildfire)
                Projectile_2.setFlag(SpriteFlag.AutoDestroy, true)
                animation.runImageAnimation(
                Projectile_2,
                assets.animation`RedCircle_Projectile`,
                50,
                false
                )
                P2Energy.value += -3
            } else if (P2SelectedCharacter == 5) {
                Alpha_Slash2()
                P2Energy.value += -50
            } else if (P2SelectedCharacter == 6) {
                sprites.destroyAllSpritesOfKind(SpriteKind.Shield2)
                Projectile_2 = sprites.createProjectileFromSprite(assets.image`Shield`, Player_2, 0, 0)
                animation.runImageAnimation(
                Projectile_2,
                assets.animation`Astral Shield`,
                100,
                false
                )
                Projectile_2.setKind(SpriteKind.Shield2)
                Projectile_2.follow(Player_2)
                P2Energy.value += -50
            }
        }
    }
})
function Taser_Lightning2 () {
    if (P2Direction == 1) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Lightning_Up`, Player_2, 0, -200)
    } else if (P2Direction == 2) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Lightning_Down`, Player_2, 0, 200)
    } else if (P2Direction == 3) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Lightning_Left`, Player_2, -200, 0)
    } else if (P2Direction == 4) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Lightning_RIght`, Player_2, 200, 0)
    } else {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Lightning_Down`, Player_2, 0, 200)
    }
    Projectile_2.setKind(SpriteKind.Bolt2)
    Projectile_2.setFlag(SpriteFlag.AutoDestroy, true)
    extraEffects.createSpreadEffectOnAnchor(Projectile_2, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Twinkle), 5000, 11)
}
sprites.onOverlap(SpriteKind.Shield2, SpriteKind.Player, function (sprite, otherSprite) {
    HP1.value += -2
})
function Stage_Select () {
    myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Green Greens", assets.image`Grass_Mini`),
    miniMenu.createMenuItem("Leafy Duels", assets.image`Grass2_Mini`),
    miniMenu.createMenuItem("Final Forest", assets.image`Grass3_Mini`),
    miniMenu.createMenuItem("Frosty Forest", assets.image`Snow_Mini`),
    miniMenu.createMenuItem("Frigid Fields", assets.image`Snow2_Mini`),
    miniMenu.createMenuItem("Tricky Tundra", assets.image`Snow3_Mini`),
    miniMenu.createMenuItem("Stone Divide", assets.image`Rock_Mini`),
    miniMenu.createMenuItem("Rocky Wrath", assets.image`Rock2_Mini`),
    miniMenu.createMenuItem("Miners Maze", assets.image`Rock3_Mini`),
    miniMenu.createMenuItem("Dessert Desert", assets.image`Sand_Mini`),
    miniMenu.createMenuItem("Safe Sands", assets.image`Sand2_Mini`),
    miniMenu.createMenuItem("Costal Showdown", assets.image`Sand3_Mini`)
    )
    myMenu.setPosition(178, 181)
    MenuStyle()
    myMenu.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Background, 3)
    myMenu.setTitle("Green Greens")
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        scene.setBackgroundImage(assets.image`Void`)
        if (selectedIndex == 0) {
            tiles.setCurrentTilemap(tilemap`Green_Greens`)
        } else if (selectedIndex == 1) {
            tiles.setCurrentTilemap(tilemap`Leafy_Duels`)
        } else if (selectedIndex == 2) {
            tiles.setCurrentTilemap(tilemap`Final_Forest`)
        } else if (selectedIndex == 3) {
            tiles.setCurrentTilemap(tilemap`Frosty Forest`)
            effects.blizzard.startScreenEffect()
        } else if (selectedIndex == 4) {
            tiles.setCurrentTilemap(tilemap`Frosty_Fields`)
            effects.blizzard.startScreenEffect()
        } else if (selectedIndex == 5) {
            tiles.setCurrentTilemap(tilemap`Tough_Tundra`)
            effects.blizzard.startScreenEffect()
        } else if (selectedIndex == 6) {
            tiles.setCurrentTilemap(tilemap`Rocky_Divide`)
        } else if (selectedIndex == 7) {
            tiles.setCurrentTilemap(tilemap`Rocky_Wrath`)
        } else if (selectedIndex == 8) {
            tiles.setCurrentTilemap(tilemap`Miner_Maze`)
        } else if (selectedIndex == 9) {
            tiles.setCurrentTilemap(tilemap`Dessert_Desert`)
        } else if (selectedIndex == 10) {
            tiles.setCurrentTilemap(tilemap`Safe_Sands`)
        } else if (selectedIndex == 11) {
            tiles.setCurrentTilemap(tilemap`Costal_Showdown`)
            scene.setBackgroundImage(assets.image`Ocean`)
            scroller.scrollBackgroundWithSpeed(15, 0)
        }
        myMenu.close()
        Player_1.setStayInScreen(true)
        Player_2.setStayInScreen(true)
        tiles.placeOnTile(Player_1, tiles.getTileLocation(2, 2))
        tiles.placeOnTile(Player_2, tiles.getTileLocation(18, 13))
        P2Energy = statusbars.create(20, 3, StatusBarKind.Magic2)
        P2Energy.setBarBorder(1, 15)
        P2Energy.max = 100
        P2Energy.setColor(10, 15)
        P2Energy.attachToSprite(Player_2)
        P2Energy.setOffsetPadding(0, 1)
        HP2.setBarBorder(1, 15)
        HP2.setColor(2, 15, 4)
        HP2.attachToSprite(Player_2, 3, 0)
        HP2.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
        P1Energy = statusbars.create(20, 3, StatusBarKind.Magic)
        P1Energy.max = 100
        P1Energy.setColor(10, 15)
        P1Energy.attachToSprite(Player_1, 1, 0)
        HP1.setColor(2, 15, 4)
        HP1.attachToSprite(Player_1, 3, 0)
        HP1.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
        P1Energy.setBarBorder(1, 15)
        HP1.setBarBorder(1, 15)
        Player_1.setFlag(SpriteFlag.Invisible, false)
        Player_2.setFlag(SpriteFlag.Invisible, false)
        GameUpdateActive = true
        P1Attack = true
        P2Attack = true
    })
}
sprites.onOverlap(SpriteKind.Bolt2, SpriteKind.Player, function (sprite, otherSprite) {
    HP1.value += -18
    effects.clearParticles(sprite)
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Explosion), 100, 48)
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Explosion), 100, 48, 10)
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(1, ExtraEffectPresetShape.Explosion), 100, 48, 5)
    sprites.destroy(sprite)
})
controller.player1.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    P1Direction = 4
})
function P1_Attack_Animation () {
    if (P1SelectedCharacter == 1) {
        if (P1Direction == 1) {
            animation.runImageAnimation(
            Player_1,
            assets.animation`Taser_Attack_Up`,
            50,
            false
            )
        } else if (P1Direction == 2) {
            animation.runImageAnimation(
            Player_1,
            assets.animation`Taser_Attack_Down`,
            50,
            false
            )
        } else if (P1Direction == 3) {
            animation.runImageAnimation(
            Player_1,
            assets.animation`Taser_Attack_Left`,
            50,
            false
            )
        } else if (P1Direction == 4) {
            animation.runImageAnimation(
            Player_1,
            assets.animation`Taser_Attack_Right`,
            50,
            false
            )
        }
    } else if (P1SelectedCharacter == 2) {
        if (Rift_Or_Rouge == 1) {
            if (P1Direction == 1) {
                animation.runImageAnimation(
                Player_1,
                assets.animation`Rift_Attack_Up`,
                50,
                false
                )
            } else if (P1Direction == 2) {
                animation.runImageAnimation(
                Player_1,
                assets.animation`Rift_Attack_Down`,
                50,
                false
                )
            } else if (P1Direction == 3) {
                animation.runImageAnimation(
                Player_1,
                assets.animation`Rift_Attack_Left`,
                50,
                false
                )
            } else if (P1Direction == 4) {
                animation.runImageAnimation(
                Player_1,
                assets.animation`Rift_Attack_Right`,
                256,
                false
                )
            }
        } else if (Rift_Or_Rouge == 2) {
            if (P1Direction == 1) {
                animation.runImageAnimation(
                Player_1,
                assets.animation`Rouge_Attack_Up`,
                50,
                false
                )
            } else if (P1Direction == 2) {
                animation.runImageAnimation(
                Player_1,
                assets.animation`Rouge_Attack_Down`,
                50,
                false
                )
            } else if (P1Direction == 3) {
                animation.runImageAnimation(
                Player_1,
                assets.animation`Rouge_Attack_Left`,
                50,
                false
                )
            } else if (P1Direction == 4) {
                animation.runImageAnimation(
                Player_1,
                assets.animation`Rouge_Attack_Right`,
                256,
                false
                )
            }
        }
    } else if (P1SelectedCharacter == 3) {
        if (P1Direction == 1) {
            animation.runImageAnimation(
            Player_1,
            assets.animation`Danger_Kitty_Attack_Up`,
            64,
            false
            )
        } else if (P1Direction == 2) {
            animation.runImageAnimation(
            Player_1,
            assets.animation`Danger_Kitty_Attack_Down`,
            64,
            false
            )
        } else if (P1Direction == 3) {
            animation.runImageAnimation(
            Player_1,
            assets.animation`Danger_Kitty_Attack_Left`,
            64,
            false
            )
        } else if (P1Direction == 4) {
            animation.runImageAnimation(
            Player_1,
            assets.animation`Danger_Kitty_Attack_Right`,
            64,
            false
            )
        }
    } else if (P1SelectedCharacter == 5) {
        if (P1Direction == 1) {
            animation.runImageAnimation(
            Player_1,
            assets.animation`Alpha_Attack_Up`,
            50,
            false
            )
        } else if (P1Direction == 2) {
            animation.runImageAnimation(
            Player_1,
            assets.animation`Alpha_Attack_Down`,
            50,
            false
            )
        } else if (P1Direction == 3) {
            animation.runImageAnimation(
            Player_1,
            assets.animation`Alpha_Attack_Left`,
            50,
            false
            )
        } else if (P1Direction == 4) {
            animation.runImageAnimation(
            Player_1,
            assets.animation`Alpha_Attack_Right`,
            50,
            false
            )
        }
    } else if (P1SelectedCharacter == 7) {
    	
    }
}
function Taser_Blast () {
    if (P1Direction == 1) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Lightning_Blast`, Player_1, 0, -150)
    } else if (P1Direction == 2) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Lightning_Blast`, Player_1, 0, 150)
    } else if (P1Direction == 3) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Lightning_Blast`, Player_1, -150, 0)
    } else if (P1Direction == 4) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Lightning_Blast`, Player_1, 150, 0)
    } else {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Lightning_Blast`, Player_1, 0, 150)
    }
    Projectile_1.setKind(SpriteKind.Blast1)
    Projectile_1.setFlag(SpriteFlag.AutoDestroy, true)
    extraEffects.createSpreadEffectOnAnchor(Projectile_1, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Twinkle), 5000, 11)
    animation.runImageAnimation(
    Projectile_1,
    assets.animation`Lightning-Projectile`,
    150,
    true
    )
}
statusbars.onStatusReached(StatusBarKind.Magic2, statusbars.StatusComparison.GT, statusbars.ComparisonType.Percentage, 50, function (status) {
    P2Attack = true
    P2Energy.setColor(10, 15)
})
function MenuStyle () {
    myMenu.setTitle("Taser")
    myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 4)
    myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 5)
    myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BackgroundColor, 1)
    myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Border, 2)
    myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BorderColor, 4)
    myMenu.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.IconOnly, 1)
    myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 10)
    myMenu.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Foreground, 1)
    myMenu.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Border, miniMenu.createBorderBox(
    0,
    0,
    0,
    2
    ))
    myMenu.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.BorderColor, 4)
    myMenu.onSelectionChanged(function (selection, selectedIndex) {
        myMenu.setTitle(selection)
    })
}
function Taser1 () {
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Taser_Walk_Right`,
    50,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Taser_Walk_Left`,
    50,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Taser_Walk_Up`,
    50,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Taser_Walk_Down`,
    50,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Taser_Idle_Right`,
    200,
    characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Taser_Idle_Left`,
    200,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Taser_Idle_Up`,
    200,
    characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Taser_Idle_Down`,
    200,
    characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving)
    )
}
statusbars.onStatusReached(StatusBarKind.Magic, statusbars.StatusComparison.GT, statusbars.ComparisonType.Percentage, 50, function (status) {
    P1Energy.setColor(10, 15)
    P1Attack = true
})
function Rift2 () {
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Rift_Walk_Right`,
    50,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Rift_Walk_Left`,
    50,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Rift_Walk_Up`,
    50,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Rift_Walk_Down`,
    50,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Rift_Idle_Right`,
    256,
    characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Rift_Idle_Left`,
    256,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Rift_Idle_Up`,
    50,
    characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Rift_Idle_Down`,
    256,
    characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving)
    )
    controller.player2.moveSprite(Player_2, 50, 50)
}
function Danger_Kitty_Slash2 () {
    if (P2Direction == 1) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_2, 0, -100)
        animation.runImageAnimation(
        Projectile_2,
        assets.animation`Slash_Down1`,
        88,
        false
        )
    } else if (P2Direction == 2) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_2, 0, 100)
        animation.runImageAnimation(
        Projectile_2,
        assets.animation`Slash_Down0`,
        88,
        false
        )
    } else if (P2Direction == 3) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_2, -100, 0)
        animation.runImageAnimation(
        Projectile_2,
        assets.animation`Slash_Left0`,
        88,
        false
        )
    } else if (P2Direction == 4) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_2, 100, 0)
        animation.runImageAnimation(
        Projectile_2,
        assets.animation`Slash_Right`,
        88,
        false
        )
    } else {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_2, 0, 100)
        animation.runImageAnimation(
        Projectile_2,
        assets.animation`Slash_Down0`,
        88,
        false
        )
    }
    Projectile_2.setKind(SpriteKind.Melee2)
    Projectile_2.setFlag(SpriteFlag.AutoDestroy, true)
}
statusbars.onStatusReached(StatusBarKind.Magic2, statusbars.StatusComparison.GT, statusbars.ComparisonType.Percentage, 10, function (status) {
    if (P2SelectedCharacter == 4) {
        P2Attack = true
        P2Energy.setColor(10, 15)
    }
})
function Taser_Blast2 () {
    if (P2Direction == 1) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Lightning_Blast`, Player_2, 0, -150)
    } else if (P2Direction == 2) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Lightning_Blast`, Player_2, 0, 150)
    } else if (P2Direction == 3) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Lightning_Blast`, Player_2, -150, 0)
    } else if (P2Direction == 4) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Lightning_Blast`, Player_2, 150, 0)
    } else {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Lightning_Blast`, Player_2, 0, 150)
    }
    Projectile_2.setKind(SpriteKind.Blast2)
    Projectile_2.setFlag(SpriteFlag.AutoDestroy, true)
    extraEffects.createSpreadEffectOnAnchor(Projectile_2, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Twinkle), 5000, 11)
    animation.runImageAnimation(
    Projectile_2,
    assets.animation`Lightning-Projectile`,
    150,
    true
    )
}
function Danger_Kitty1 () {
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Danger_Kitty_Walk_Right`,
    64,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Danger_Kitty_Walk_Left`,
    64,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Danger_Kitty_Walk_Up`,
    64,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Danger_Kitty_Walk_Down`,
    64,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Danger_Kitty_Idle_Right`,
    64,
    characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Danger_Kitty_Idle_Left`,
    64,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Danger_Kitty_Idle_Up`,
    64,
    characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Danger_Kitty_Idle_Down`,
    64,
    characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving)
    )
}
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    P2Direction = 3
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Repeated, function () {
    if (P1Attack == true) {
        if (P1SelectedCharacter == 4) {
            if (P1Direction == 1) {
                Projectile_1 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_1, 0, -88)
            } else if (P1Direction == 2) {
                Projectile_1 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_1, 0, 88)
            } else if (P1Direction == 3) {
                Projectile_1 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_1, -88, 0)
            } else if (P1Direction == 4) {
                Projectile_1 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_1, 88, 0)
            } else {
                Projectile_1 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_1, 0, 88)
            }
            Projectile_1.setKind(SpriteKind.P1_Wildfire)
            animation.runImageAnimation(
            Projectile_1,
            assets.animation`RedCircle_Projectile`,
            50,
            false
            )
            P1Energy.value += -3
        }
    }
})
function RedSprite2 () {
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`RedSprite_Right`,
    200,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`RedSprite_Left`,
    200,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`RedSprite_Up`,
    200,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`RedSprite_Down`,
    200,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`RedSprite_Idle`,
    50,
    characterAnimations.rule(Predicate.NotMoving)
    )
}
sprites.onOverlap(SpriteKind.P1_Wildfire, SpriteKind.Player2, function (sprite, otherSprite) {
    HP2.value += -3
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Explosion), 100, 48, 1)
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Blast2, SpriteKind.Player, function (sprite, otherSprite) {
    HP1.value += -23.5
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Explosion), 100, 48)
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Explosion), 100, 48, 10)
    sprites.destroy(sprite)
})
function Alpha_Slash2 () {
    if (P2Direction == 1) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_2, 0, -111)
        animation.runImageAnimation(
        Projectile_2,
        assets.animation`Green_Slash_Up`,
        88,
        false
        )
    } else if (P2Direction == 2) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_2, 0, 50)
        animation.runImageAnimation(
        Projectile_2,
        assets.animation`Red_Slash_Down`,
        88,
        false
        )
    } else if (P2Direction == 3) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_2, -111, 0)
        animation.runImageAnimation(
        Projectile_2,
        assets.animation`Green_Slash_Left`,
        88,
        false
        )
    } else if (P2Direction == 4) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_2, 111, 0)
        animation.runImageAnimation(
        Projectile_2,
        assets.animation`Red_Slash_Right`,
        88,
        false
        )
    } else {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_2, 0, 111)
        animation.runImageAnimation(
        Projectile_2,
        assets.animation`Red_Slash_Down`,
        88,
        false
        )
    }
    Projectile_2.setKind(SpriteKind.Melee2)
    Projectile_2.setFlag(SpriteFlag.AutoDestroy, true)
}
sprites.onOverlap(SpriteKind.Melee1, SpriteKind.Player2, function (sprite, otherSprite) {
    HP2.value += -30
    sprites.destroy(sprite)
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Released, function () {
    if (P1SelectedCharacter == 4) {
        effects.clearParticles(Player_1)
        controller.player1.moveSprite(Player_1, 64, 64)
    }
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Repeated, function () {
    if (P2Attack == true) {
        if (P2SelectedCharacter == 4) {
            if (P2Direction == 1) {
                Projectile_2 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_2, 0, -88)
            } else if (P2Direction == 2) {
                Projectile_2 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_2, 0, 88)
            } else if (P2Direction == 3) {
                Projectile_2 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_2, -88, 0)
            } else if (P2Direction == 4) {
                Projectile_2 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_2, 88, 0)
            } else {
                Projectile_2 = sprites.createProjectileFromSprite(assets.image`RedCircle`, Player_2, 0, 88)
            }
            Projectile_2.setKind(SpriteKind.P2_Wildfire)
            Projectile_2.setFlag(SpriteFlag.AutoDestroy, true)
            animation.runImageAnimation(
            Projectile_2,
            assets.animation`RedCircle_Projectile`,
            50,
            false
            )
            P2Energy.value += -3
        }
    }
})
function RiftRouge_Attack2 () {
    if (Rift_Or_Rouge2 == 1) {
        if (P2Direction == 1) {
            Projectile_2 = sprites.createProjectileFromSprite(assets.image`Darkness`, Player_2, 0, -120)
        } else if (P2Direction == 2) {
            Projectile_2 = sprites.createProjectileFromSprite(assets.image`Darkness`, Player_2, 0, 120)
        } else if (P2Direction == 3) {
            Projectile_2 = sprites.createProjectileFromSprite(assets.image`Darkness`, Player_2, -120, 0)
        } else if (P2Direction == 4) {
            Projectile_2 = sprites.createProjectileFromSprite(assets.image`Darkness`, Player_2, 120, 0)
        } else {
            Projectile_2 = sprites.createProjectileFromSprite(assets.image`Darkness`, Player_2, 0, 120)
        }
        Projectile_2.setKind(SpriteKind.Shadow2)
        Projectile_2.setFlag(SpriteFlag.AutoDestroy, true)
        extraEffects.createSpreadEffectOnAnchor(Projectile_2, extraEffects.createSingleColorSpreadEffectData(10, ExtraEffectPresetShape.Spark), 1000, 11)
        animation.runImageAnimation(
        Projectile_2,
        assets.animation`Shadow-Projectile`,
        150,
        false
        )
    } else if (Rift_Or_Rouge2 == 2) {
        if (P2Direction == 1) {
            Projectile_2 = sprites.createProjectileFromSprite(assets.image`Fire_Attack`, Player_2, 0, -111)
            animation.runImageAnimation(
            Projectile_2,
            assets.animation`Fire_Slash_Up`,
            88,
            false
            )
        } else if (P2Direction == 2) {
            Projectile_2 = sprites.createProjectileFromSprite(assets.image`Fire_Attack`, Player_2, 0, 111)
            animation.runImageAnimation(
            Projectile_2,
            assets.animation`Fire_Slash_Down`,
            88,
            false
            )
        } else if (P2Direction == 3) {
            Projectile_2 = sprites.createProjectileFromSprite(assets.image`Fire_Attack`, Player_2, -111, 0)
            animation.runImageAnimation(
            Projectile_2,
            assets.animation`Fire_Slash_Left`,
            88,
            false
            )
        } else if (P2Direction == 4) {
            Projectile_2 = sprites.createProjectileFromSprite(assets.image`Fire_Attack`, Player_2, 111, 0)
            animation.runImageAnimation(
            Projectile_2,
            assets.animation`Fire_Slash_Right`,
            88,
            false
            )
        } else {
            Projectile_2 = sprites.createProjectileFromSprite(assets.image`Fire_Attack`, Player_2, 0, 111)
            animation.runImageAnimation(
            Projectile_2,
            assets.animation`Fire_Slash_Down`,
            88,
            false
            )
        }
        extraEffects.createSpreadEffectOnAnchor(Projectile_2, extraEffects.createSingleColorSpreadEffectData(3, ExtraEffectPresetShape.Twinkle), 360, 11)
        Projectile_2.setKind(SpriteKind.Melee2)
        Projectile_2.setFlag(SpriteFlag.AutoDestroy, true)
    }
}
function Alpha_Scarfshot2 () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Blast2)
    if (P2Direction == 1) {
        Scarf2 = sprites.createProjectileFromSprite(assets.image`Alpha_ScarfShot_Up`, Player_2, 0, -100)
    } else if (P2Direction == 2) {
        Scarf2 = sprites.createProjectileFromSprite(assets.image`Alpha_ScarfShot_Down`, Player_2, 0, 100)
    } else if (P2Direction == 3) {
        Scarf2 = sprites.createProjectileFromSprite(assets.image`Alpha_ScarfShot_Left`, Player_2, -100, 0)
    } else if (P2Direction == 4) {
        Scarf2 = sprites.createProjectileFromSprite(assets.image`Alpha_ScarfShot_Right`, Player_2, 100, 0)
    } else {
        Scarf2 = sprites.createProjectileFromSprite(assets.image`Alpha_ScarfShot_Down`, Player_2, 0, 100)
    }
    Scarf2.setKind(SpriteKind.Blast2)
    timer.after(1250, function () {
        Scarf2.setVelocity(0, 0)
        Scarf2.setImage(assets.image`Alpha_Scarfshot`)
    })
}
sprites.onOverlap(SpriteKind.Shield1, SpriteKind.Projectile2, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Shield2, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
})
function Danger_Kitty_Blast2 () {
    if (P2Direction == 1) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Blast`, Player_2, 0, -135)
    } else if (P2Direction == 2) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Blast`, Player_2, 0, 135)
    } else if (P2Direction == 3) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Blast`, Player_2, -135, 0)
    } else if (P2Direction == 4) {
        Projectile_2 = sprites.createProjectileFromSprite(assets.image`Blast`, Player_2, 135, 0)
    }
    Projectile_2.setKind(SpriteKind.Projectile2)
    extraEffects.createSpreadEffectOnAnchor(Projectile_2, Fire_Effect, 1700, 11)
    animation.runImageAnimation(
    Projectile_2,
    [img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 4 1 1 1 4 3 . . . . 
        . . . . 3 4 4 1 4 4 3 . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . 3 3 4 4 1 4 4 3 3 . . . 
        . . . 3 4 4 1 1 1 4 4 3 . . . 
        . . . 3 4 1 1 1 1 1 4 3 . . . 
        . . . 3 4 4 1 1 1 4 4 3 . . . 
        . . . 3 3 4 4 1 4 4 3 3 . . . 
        . . . . 3 3 4 4 4 3 3 . . . . 
        . . . . . 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . 3 3 3 3 3 3 3 . . . . 
        . . . 3 3 4 4 4 4 4 3 3 . . . 
        . . 3 3 4 4 1 1 1 4 4 3 3 . . 
        . . 3 4 4 1 1 1 1 1 4 4 3 . . 
        . . 3 4 1 1 1 1 1 1 1 4 3 . . 
        . . 3 4 1 1 1 1 1 1 1 4 3 . . 
        . . 3 4 1 1 1 1 1 1 1 4 3 . . 
        . . 3 4 4 1 1 1 1 1 4 4 3 . . 
        . . 3 3 4 4 1 1 1 4 4 3 3 . . 
        . . . 3 3 4 4 4 4 4 3 3 . . . 
        . . . . 3 3 3 3 3 3 3 . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . 3 3 3 3 3 3 3 . . . . 
        . . 3 3 3 4 4 4 4 4 3 3 3 . . 
        . . 3 4 4 4 1 1 1 4 4 4 3 . . 
        . 3 3 4 1 1 1 1 1 1 1 4 3 3 . 
        . 3 4 4 1 1 1 1 1 1 1 4 4 3 . 
        . 3 4 1 1 1 1 1 1 1 1 1 4 3 . 
        . 3 4 1 1 1 1 1 1 1 1 1 4 3 . 
        . 3 4 1 1 1 1 1 1 1 1 1 4 3 . 
        . 3 4 4 1 1 1 1 1 1 1 4 4 3 . 
        . 3 3 4 1 1 1 1 1 1 1 4 3 3 . 
        . . 3 4 4 4 1 1 1 4 4 4 3 . . 
        . . 3 3 3 4 4 4 4 4 3 3 3 . . 
        . . . . 3 3 3 3 3 3 3 . . . . 
        . . . . . . . . . . . . . . . 
        `,img`
        . . . 3 3 3 3 3 3 3 3 3 . . . 
        . 3 3 3 4 4 4 4 4 4 4 3 3 3 . 
        . 3 4 4 4 1 1 1 1 1 4 4 4 3 . 
        3 3 4 1 1 1 1 1 1 1 1 1 4 3 3 
        3 4 4 1 1 1 1 1 1 1 1 1 4 4 3 
        3 4 1 1 1 1 1 1 1 1 1 1 1 4 3 
        3 4 1 1 1 1 1 1 1 1 1 1 1 4 3 
        3 4 1 1 1 1 1 1 1 1 1 1 1 4 3 
        3 4 1 1 1 1 1 1 1 1 1 1 1 4 3 
        3 4 1 1 1 1 1 1 1 1 1 1 1 4 3 
        3 4 4 1 1 1 1 1 1 1 1 1 4 4 3 
        3 3 4 1 1 1 1 1 1 1 1 1 4 3 3 
        . 3 4 4 4 1 1 1 1 1 4 4 4 3 . 
        . 3 3 3 4 4 4 4 4 4 4 3 3 3 . 
        . . . 3 3 3 3 3 3 3 3 3 . . . 
        `,img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `],
    50,
    false
    )
}
function RiftRouge_Attack1 () {
    if (Rift_Or_Rouge == 1) {
        if (P1Direction == 1) {
            Projectile_1 = sprites.createProjectileFromSprite(assets.image`Darkness`, Player_1, 0, -120)
            Projectile_1_2 = sprites.createProjectileFromSprite(assets.image`Darkness`, Player_1, 0, -120)
        } else if (P1Direction == 2) {
            Projectile_1 = sprites.createProjectileFromSprite(assets.image`Darkness`, Player_1, 0, 120)
            Projectile_1_2 = sprites.createProjectileFromSprite(assets.image`Darkness`, Player_1, 0, 120)
        } else if (P1Direction == 3) {
            Projectile_1 = sprites.createProjectileFromSprite(assets.image`Darkness`, Player_1, -120, 0)
            Projectile_1_2 = sprites.createProjectileFromSprite(assets.image`Darkness`, Player_1, -120, 0)
        } else if (P1Direction == 4) {
            Projectile_1 = sprites.createProjectileFromSprite(assets.image`Darkness`, Player_1, 120, 0)
            Projectile_1_2 = sprites.createProjectileFromSprite(assets.image`Darkness`, Player_1, 120, 0)
        } else {
            Projectile_1 = sprites.createProjectileFromSprite(assets.image`Darkness`, Player_1, 0, 120)
            Projectile_1_2 = sprites.createProjectileFromSprite(assets.image`Darkness`, Player_1, 0, 120)
        }
        Projectile_1_2.setKind(SpriteKind.Shadow1)
        extraEffects.createSpreadEffectOnAnchor(Projectile_1, extraEffects.createSingleColorSpreadEffectData(10, ExtraEffectPresetShape.Spark), 1000, 11)
        animation.runImageAnimation(
        Projectile_1,
        assets.animation`Shadow-Projectile`,
        150,
        false
        )
        animation.runImageAnimation(
        Projectile_1_2,
        assets.animation`Shadow-Projectile2`,
        150,
        false
        )
    } else if (Rift_Or_Rouge == 2) {
        if (P1Direction == 1) {
            Projectile_1 = sprites.createProjectileFromSprite(assets.image`Fire_Attack`, Player_1, 0, -111)
            animation.runImageAnimation(
            Projectile_1,
            assets.animation`Fire_Slash_Up`,
            88,
            false
            )
        } else if (P1Direction == 2) {
            Projectile_1 = sprites.createProjectileFromSprite(assets.image`Fire_Attack`, Player_1, 0, 111)
            animation.runImageAnimation(
            Projectile_1,
            assets.animation`Fire_Slash_Down`,
            88,
            false
            )
        } else if (P1Direction == 3) {
            Projectile_1 = sprites.createProjectileFromSprite(assets.image`Fire_Attack`, Player_1, -111, 0)
            animation.runImageAnimation(
            Projectile_1,
            assets.animation`Fire_Slash_Left`,
            88,
            false
            )
        } else if (P1Direction == 4) {
            Projectile_1 = sprites.createProjectileFromSprite(assets.image`Fire_Attack`, Player_1, 111, 0)
            animation.runImageAnimation(
            Projectile_1,
            assets.animation`Fire_Slash_Right`,
            88,
            false
            )
        } else {
            Projectile_1 = sprites.createProjectileFromSprite(assets.image`Fire_Attack`, Player_1, 0, 111)
            animation.runImageAnimation(
            Projectile_1,
            assets.animation`Fire_Slash_Down`,
            88,
            false
            )
        }
        Projectile_1.setKind(SpriteKind.Melee1)
        extraEffects.createSpreadEffectOnAnchor(Projectile_1, extraEffects.createSingleColorSpreadEffectData(3, ExtraEffectPresetShape.Twinkle), 360, 11)
        Projectile_1.setFlag(SpriteFlag.AutoDestroy, true)
    }
}
controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    P2Direction = 1
})
function Rouge1 () {
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Rouge_Walk_Right`,
    50,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Rouge_Walk_Left`,
    50,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Rouge_Walk_Up`,
    50,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Rouge_Walk_Down`,
    50,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Rouge_Idle_Right`,
    256,
    characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Rouge_Idle_Left`,
    256,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Rouge_Idle_Up`,
    50,
    characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_1,
    assets.animation`Rouge_Idle_Down`,
    256,
    characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving)
    )
    controller.player1.moveSprite(Player_1, 58, 58)
}
function Taser_Lightning () {
    if (P1Direction == 1) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Lightning_Up`, Player_1, 0, -200)
    } else if (P1Direction == 2) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Lightning_Down`, Player_1, 0, 200)
    } else if (P1Direction == 3) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Lightning_Left`, Player_1, -200, 0)
    } else if (P1Direction == 4) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Lightning_RIght`, Player_1, 200, 0)
    } else {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Lightning_Down`, Player_1, 0, 200)
    }
    Projectile_1.setKind(SpriteKind.Bolt1)
    Projectile_1.setFlag(SpriteFlag.AutoDestroy, true)
    extraEffects.createSpreadEffectOnAnchor(Projectile_1, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Twinkle), 5000, 11)
}
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Repeated, function () {
    if (P2Attack == true) {
        if (P2SelectedCharacter == 4) {
            P2Energy.value += -1
            controller.player2.moveSprite(Player_2, 128, 128)
            extraEffects.createSpreadEffectOnAnchor(Player_2, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Spark), 100, 48, 1)
        }
    } else {
        P2Attack = false
        effects.clearParticles(Player_2)
        controller.player2.moveSprite(Player_2, 64, 64)
    }
})
statusbars.onStatusReached(StatusBarKind.Health, statusbars.StatusComparison.LTE, statusbars.ComparisonType.Percentage, 0, function (status) {
    Player_1.setKind(SpriteKind.Enemy)
    Player1Dead = true
    HP1.setColor(0, 0)
    P1Energy.setColor(0, 0)
    characterAnimations.setCharacterAnimationsEnabled(Player_1, false)
    game.splash("Player 2 Wins!")
    game.reset()
})
function Alpha_Slash1 () {
    if (P1Direction == 1) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_1, 0, -88)
        animation.runImageAnimation(
        Projectile_1,
        assets.animation`Green_Slash_Up`,
        88,
        false
        )
    } else if (P1Direction == 2) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_1, 0, 88)
        animation.runImageAnimation(
        Projectile_1,
        assets.animation`Red_Slash_Down`,
        88,
        false
        )
    } else if (P1Direction == 3) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_1, -88, 0)
        animation.runImageAnimation(
        Projectile_1,
        assets.animation`Green_Slash_Left`,
        88,
        false
        )
    } else if (P1Direction == 4) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_1, 88, 0)
        animation.runImageAnimation(
        Projectile_1,
        assets.animation`Red_Slash_Right`,
        88,
        false
        )
    } else {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_1, 0, 88)
        animation.runImageAnimation(
        Projectile_1,
        assets.animation`Red_Slash_Down`,
        88,
        false
        )
    }
    Projectile_1.setKind(SpriteKind.Melee1)
    Projectile_1.setFlag(SpriteFlag.AutoDestroy, true)
}
sprites.onOverlap(SpriteKind.Blast1, SpriteKind.Player2, function (sprite, otherSprite) {
    HP2.value += -23.5
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Explosion), 100, 48)
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Explosion), 100, 48, 10)
    sprites.destroy(sprite)
})
controller.player2.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function () {
    P2Direction = 2
})
function Taser2 () {
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Taser_Walk_Right`,
    50,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Taser_Walk_Left`,
    50,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Taser_Walk_Up`,
    50,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Taser_Walk_Down`,
    50,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Taser_Idle_Right`,
    200,
    characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Taser_Idle_Left`,
    200,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Taser_Idle_Up`,
    200,
    characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Taser_Idle_Down`,
    200,
    characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving)
    )
}
statusbars.onStatusReached(StatusBarKind.Magic2, statusbars.StatusComparison.LT, statusbars.ComparisonType.Percentage, 50, function (status) {
    if (P2SelectedCharacter == 4) {
    	
    } else {
        P2Attack = false
        P2Energy.setColor(12, 15)
    }
})
sprites.onOverlap(SpriteKind.Shadow1, SpriteKind.Player2, function (sprite, otherSprite) {
    HP2.value += -10
    if (P2SelectedCharacter == 8) {
        extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(1, ExtraEffectPresetShape.Explosion), 100, 48, 10)
        extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(4, ExtraEffectPresetShape.Explosion), 100, 48, 8)
    }
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player2, function (sprite, otherSprite) {
    HP2.value += -20
    if (P1SelectedCharacter == 2) {
        extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(12, ExtraEffectPresetShape.Explosion), 100, 48, 6)
        extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(10, ExtraEffectPresetShape.Explosion), 100, 48, 5)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shadow1)
    } else {
        extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(3, ExtraEffectPresetShape.Explosion), 100, 48, 10)
        extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(4, ExtraEffectPresetShape.Explosion), 100, 48, 10)
        extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(1, ExtraEffectPresetShape.Explosion), 100, 48, 5)
    }
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Bolt2, SpriteKind.Shield1, function (sprite, otherSprite) {
    effects.clearParticles(sprite)
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Explosion), 100, 48)
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Explosion), 100, 48, 10)
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(1, ExtraEffectPresetShape.Explosion), 100, 48, 5)
    sprites.destroy(sprite)
})
function Danger_Kitty_Slash1 () {
    if (P1Direction == 1) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_1, 0, -100)
        animation.runImageAnimation(
        Projectile_1,
        assets.animation`Slash_Down1`,
        88,
        false
        )
    } else if (P1Direction == 2) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_1, 0, 100)
        animation.runImageAnimation(
        Projectile_1,
        assets.animation`Slash_Down0`,
        88,
        false
        )
    } else if (P1Direction == 3) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_1, -100, 0)
        animation.runImageAnimation(
        Projectile_1,
        assets.animation`Slash_Left0`,
        88,
        false
        )
    } else if (P1Direction == 4) {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_1, 100, 0)
        animation.runImageAnimation(
        Projectile_1,
        assets.animation`Slash_Right`,
        88,
        false
        )
    } else {
        Projectile_1 = sprites.createProjectileFromSprite(assets.image`Slash`, Player_1, 0, 100)
        animation.runImageAnimation(
        Projectile_1,
        assets.animation`Slash_Down1`,
        88,
        false
        )
    }
}
function Rouge2 () {
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Rouge_Walk_Right`,
    50,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Rouge_Walk_Left`,
    50,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Rouge_Walk_Up`,
    50,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Rouge_Walk_Down`,
    50,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Rouge_Idle_Right`,
    256,
    characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Rouge_Idle_Left`,
    256,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Rouge_Idle_Up`,
    50,
    characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    Player_2,
    assets.animation`Rouge_Idle_Down`,
    256,
    characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving)
    )
    controller.player2.moveSprite(Player_2, 58, 58)
}
statusbars.onStatusReached(StatusBarKind.Magic2, statusbars.StatusComparison.LTE, statusbars.ComparisonType.Percentage, 1, function (status) {
    P2Attack = false
    P2Energy.setColor(14, 15)
})
statusbars.onStatusReached(StatusBarKind.Magic, statusbars.StatusComparison.LT, statusbars.ComparisonType.Percentage, 50, function (status) {
    if (P1SelectedCharacter == 4) {
    	
    } else {
        P1Attack = false
        P1Energy.setColor(12, 15)
    }
})
sprites.onOverlap(SpriteKind.Blast1, SpriteKind.Shield2, function (sprite, otherSprite) {
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Explosion), 100, 48)
    extraEffects.createSpreadEffectOnAnchor(sprite, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Explosion), 100, 48, 8)
    sprites.destroy(sprite)
})
let Player1Dead = false
let Projectile_1_2: Sprite = null
let Scarf2: Sprite = null
let Projectile_2: Sprite = null
let Player2Dead = false
let Rift_Or_Rouge = 0
let P2Direction = 0
let Scarf1: Sprite = null
let P1SelectedCharacter = 0
let P1Energy: StatusBarSprite = null
let Player_1: Sprite = null
let Projectile_1: Sprite = null
let P1Direction = 0
let P2Energy: StatusBarSprite = null
let P2Attack = false
let Rift_Or_Rouge2 = 0
let Player_2: Sprite = null
let P2SelectedCharacter = 0
let myMenu: miniMenu.MenuSprite = null
let HP1: StatusBarSprite = null
let HP2: StatusBarSprite = null
let TitleScreen = false
let Fire_Effect: SpreadEffectData = null
let Title: Sprite = null
let CanAttack1 = false
let GameUpdateActive = false
let P1Attack = false
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 336
    export const ARCADE_SCREEN_HEIGHT = 256
}
game.setDialogCursor(assets.image`A`)
P1Attack = false
GameUpdateActive = false
CanAttack1 = true
let CanAttack2 = true
Title = sprites.create(assets.image`Title_Screen2`, SpriteKind.StatusBar)
animation.runImageAnimation(
Title,
assets.animation`Title_Animation`,
200,
true
)
Fire_Effect = extraEffects.createCustomSpreadEffectData(
[
3,
4,
1
],
false,
extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Spark),
extraEffects.createPercentageRange(20, 50),
extraEffects.createPercentageRange(23, 53),
extraEffects.createTimeRange(100, 200)
)
TitleScreen = true
forever(function () {
    if (Player2Dead == true) {
        P2Attack = false
        Player_2.setImage(assets.image`Grave`)
        controller.player2.moveSprite(Player_2, 3, 3)
    }
    if (Player1Dead == true) {
        P1Attack = false
        Player_1.setImage(assets.image`Grave`)
        controller.player1.moveSprite(Player_1, 3, 3)
    }
})
game.onUpdateInterval(45, function () {
    if (TitleScreen == false) {
        if (GameUpdateActive == true) {
            if (P1SelectedCharacter == 2) {
                if (Rift_Or_Rouge == 2) {
                    P1Energy.value += 1
                }
            }
            if (P2SelectedCharacter == 2) {
                if (Rift_Or_Rouge2 == 2) {
                    P2Energy.value += 1
                }
            }
        }
    }
})
game.onUpdateInterval(64, function () {
    if (TitleScreen == false) {
        if (GameUpdateActive == true) {
            if (P1SelectedCharacter == 3) {
                P1Energy.value += 1
            }
            if (P2SelectedCharacter == 3) {
                P2Energy.value += 1
            }
            if (P1SelectedCharacter == 5) {
                P1Energy.value += 1
            }
            if (P2SelectedCharacter == 5) {
                P2Energy.value += 1
            }
        }
    }
})
game.onUpdateInterval(53, function () {
    if (TitleScreen == false) {
        if (GameUpdateActive == true) {
            if (P1SelectedCharacter == 1) {
                P1Energy.value += 1
            }
            if (P2SelectedCharacter == 1) {
                P2Energy.value += 1
            }
            if (P1SelectedCharacter == 6) {
                P1Energy.value += 1
            }
            if (P2SelectedCharacter == 6) {
                P2Energy.value += 1
            }
        }
    }
})
game.onUpdateInterval(100, function () {
    if (TitleScreen == false) {
        if (GameUpdateActive == true) {
            if (P1SelectedCharacter == 4) {
                P1Energy.value += 1
            }
            if (P2SelectedCharacter == 4) {
                P2Energy.value += 1
            }
        }
    }
})
game.onUpdateInterval(333, function () {
    if (TitleScreen == false) {
        if (GameUpdateActive == true) {
            HP1.value += 1
            HP2.value += 1
        }
    }
})
game.onUpdateInterval(36, function () {
    if (TitleScreen == false) {
        if (GameUpdateActive == true) {
            if (P1SelectedCharacter == 7) {
                P1Energy.value += 1.5
            }
            if (P2SelectedCharacter == 7) {
                P2Energy.value += 1.5
            }
            if (P1SelectedCharacter == 2) {
                if (Rift_Or_Rouge == 1) {
                    P1Energy.value += 1
                }
            }
            if (P2SelectedCharacter == 2) {
                if (Rift_Or_Rouge2 == 1) {
                    P2Energy.value += 1
                }
            }
        }
    }
})
