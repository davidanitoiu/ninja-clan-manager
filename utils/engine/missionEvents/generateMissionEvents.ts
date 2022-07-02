import { MissionEvent } from "utils/types/events";
import { CompoundApproachResults } from "../approaches";

export function generateMissionEvents(missionSuccess: boolean, compoundApproachResults: CompoundApproachResults): MissionEvent[] {
    const missionEvents: MissionEvent[] = [];

    // approach is pickpocketing
    // 1. The ninja could use a smoke bomb to cause a distraction and then quickly grab the item.
    // 2. The ninja could use a grappling hook to snag the item from a distance.
    // 3. The ninja could use a mirror to reflect light into the guard's eyes, blinding them for a moment and allowing the ninja to grab the item.
    // 4. The ninja could use a piece of cloth soaked in a knockout gas to render the guard unconscious, and then take the item.
    // 5. The ninja could use a small tool to pick the lock on a container holding the item, and then take it without the guard noticing.
    // 6. steal a weapon or piece of armor
    // 7. steal a bow or quiver of arrows
    // 8. A set of keys
    // 9. A scroll
    // 10. A map
    // 11. A lantern
    // 12. A hidden blade
    // 13. place A small knapsack filled with explosives
    // 14. place A small pouch filled with poison
    // 15. place A hidden message written in another guard's blood
    // 16. place Bloody bandages
    // 17. place A knife with dirty blood on it
    // 18. place A bloody cloth
    // 19. place A kunai with blood on it
    // 20. place A shuriken with blood on it
    // 21. place A scroll with a secret message

    // approach is poison
    // 1. The ninja could put poison in the guard's food or water.
    // 2. The ninja could coat his or her weapon in poison and then strike the guard with it.
    // 3. The ninja could put poison on a arrow or dart and then shoot it at the guard.
    // 4. The ninja could throw a poisoned weapon or object at the guard.
    // 5. The ninja could release a poisonous gas or liquid near the guard.
    // 6. Subduing the guard with a tranquilizer dart.


    // approach is ambush
    // 1. A ninja can sneak up on a guard from behind and stab him in the back.
    // 2. A ninja can climb up a tree or onto a roof, and then drop down onto the guard from above.
    // 3. A ninja can hide in the shadows and then attack the guard when he walks by.
    // 4. Hiding in the shadows and waiting for the right moment to strike
    // 5. Approaching from behind and taking them by surprise
    // 6. leaping out from behind a corner and attacking
    // 7. using a distraction to draw the guard's attention away before attacking
    // 8. attacking from above, using the element of surprise
    // 9. Hiding in the shadows and leaping out to attack when the guard is least expecting it.
    // 10. Pretending to be part of the furniture or landscape and attacking when the guard walks past.
    // 11. Hiding in a container or small space and attacking when the guard comes close.
    // 12. Attacking from above, using the element of surprise to take the guard down.
    // 13. Making a loud noise to distract the guard and then attacking while they are off-guard.
    // 14. Throw a smoke bomb or flash bang at the guard and then quickly sneak up behind him and stab him in the back.

    // approach is combat
    // 1. The ninja grabs the guard's arm and twists it behind his back, immobilizing him.
    // 2. The ninja kicks the guard in the back of the knee, causing him to collapse.
    // 3. The ninja punches the guard in the stomach, knocking the wind out of him.
    // 4. The ninja headbutts the guard, disorienting him.
    // 5. The ninja sweeps the guard's leg out from under him, toppling him to the ground.
    // 6. Use the ninjutsu to dodge the guard's attack
    // 7. Use the ninjutsu to hit the guard with a quick strike
    // 8. Use the ninjutsu to easily stunning the guard with a quick strike
    // 9. Use the ninjutsu to parry the guard's attack
    // 10. Use the ninjutsu to easily kill the guard with a quick strike
    // 11. Stand up and use your arms to push and pull the guard's shoulder while avoiding contact with their skin
    // 12. Use your limbs to pull the guard's arm back and towards your body
    // 13. Use your limbs to push the guard's shoulder back and towards yourself
    // 14. Use your arms to pull the guard's arm into your hand and hold it closed while dodging the next damaging strike
    // 15. Use your arms to pull the guard's arm towards you and then use your hands to defend yourself from the next attack
    // 16. Jab the guard in the face with a sharp object to cause him to stumble.
    // 17. Use your agility to jump over the guard's body
    // 18. Use your quick reflexes to dodge the guard's blows
    // 19. Throw a shuriken at the guard and then use the momentum to vault over him and stab him in the back.
    // 20. Shoot an arrow or shuriken at the guard and then quickly use a fan or wind tunnel to disrupt the guard's vision.

    // approach is stealth
    // 1. sneaking up behind the guard and sneaking past them without being seen
    // 2. staying low and moving quickly through the crowd
    // 3. blending in with the crowd and pretending to be someone else
    // 4. slipping through the cracks in the security barriers
    // 5. using a hidden object to gain access to the guard's quarters
    // 6. Crossing the room in the dark
    // 7. Climb up the wall
    // 8. Crossing the room on a high surface
    // 9. sneaking through the window
    // 10. Climb a tree
    // 12. Hide in a crowd
    // 13. Hide in a building
    // 14. the ninja can create enough distractions, the guard may not be able to focus on them. This could include yelling, making noise with tools, or throwing things.
    // 15. hide behind a pillar, behind a rock, behind a tree
    // 16. hide in a container or small space
    // 17. Swimming underneath the guard
    // 18. limbing up onto a nearby roof or tree and then dropping down behind the guard

    // approach is disguise
    // 1. The ninja can disguise himself as a guard or a guard's uniform.
    // 2. Disguise as a servant or messenger.
    // 3. Use your well-mannered behavior to avoid the guard's notice
    // 4. Disguise as an animal.
    // 5. Disguise as a commoner or worker.
    // 6. Disguise as a noble or aristocrat.
    // 7. Disguise as a merchant.
    // 8. Wear a cloak to cover your body.
    // 9. Use a prosthetic or fake limb
    // 10. Feign ignorance and ask the guard to show you to the other side of the room.
    // 11. Make the guard less alert (give them a drowsy potion, play music loudly, etc.)
    // 12. Pretend to be a beggar and ask for something small, like a coin or a piece of bread.

    // approach is trap
    // 1. Walking into a hidden tripwire.
    // 2. Standing on a pressure plate.
    // 3. Climbing over a low wall.
    // 4. Walking into an hidden pit.
    // 5. Standing in front of an open door.
    // 6. The guard falls victim to a hidden blade, which pierces his foot and triggers the trap.
    // 7. The guard overlooks a hidden blade, which is poised to stab him in the back.
    // 8. The guard is surprised by a hidden blade, which pierces his arm and triggers the trap.
    // 9. The guard walks into a hidden net, which ensnares him and pulls him into the net.
    // 10. Falling into a deep pool of water

    // approach is lockpick
    // 1. Make noise to make the guard focus on you, then use the noise to distract them so you can pick the lock.
    // 2. Use a shuriken to distract the guard and then use the distraction to pick the lock.
    // 3. Use a mirror to distract the guard and then use the distraction to pick the lock.
    // 4. Use a piece of cloth soaked in a knockout gas to render the guard unconscious, and then use the distraction to pick the lock.
    // 5. Use a skeleton key.
    // 6. Use a shuriken to pick the lock
    // 7. Using mental preparation and focus to remain stealthy

    // approach is snipe
    // 1. The ninja can use a bow to shoot a target.
    // 2. The ninja can use a crossbow to shoot a target.
    // 3. The ninja can use a sling to shoot a target.
    // 4. The ninja can use a longbow to shoot a target.
    // 5. Shoot an arrow or shuriken at the guard from a faraway location.
    // 6. Throw a smoke bomb or flash bang at the guard and then quickly sneak up behind him and stab him in the back.
    // 7. Use a kunai to slash the guard's throat from a safe distance.
    // 8. Use an explosive tag to take out the guard from a distance.
    // 9. Use a shuriken to throw it at the guard's head from a distance.
    // 10. Use a kunai to stab the guard in the eye from a distance.
    // 11. Use a senbon to stab the guard in the stomach from a distance.
    // 12. Use a shuriken to throw it at the guard's feet from a distance.
    // 13. Use a kunai to stab the guard in the leg from a distance.

    // approach is bribery
    // 1. offering them money
    // 2. offering them food or drink
    // 3. offering them help with their job
    // 4. offering them protection
    // 5. Offering to spare the guard's life.
    // 6. Threatening to harm the guard's family.
    // 7. Give the guard information they need (information on the location of a valuable item, the location of a secret passage, etc.)
    // 8. feign ignorance about the rules and regulations, or act like you don't understand what's happening.
    // 9. A ninja can use humor to disarm and confuse the guard 
    // 10. A ninja can use a trick to make the guard think he's a prisoner
    // 11. Convince the guard that the mission is important and that he should let them through.
    // 12. Suggest that the guard may be neglecting his duty and that he should be punished.
    // 13. Suggest that the guard may be a threat to the mission and that he should be punished.
    // 14. The ninja can compliment the guard, telling them they are brave or handsome, or that they are a good person.
    // 15. The ninja can convince the guard that they are someone they are not, such as a messenger from the lord or a trusted friend.

    return missionEvents;
}