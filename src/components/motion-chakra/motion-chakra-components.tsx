import { motion } from "framer-motion";
import { Card, Button } from "@chakra-ui/react";

//Transforming chakra components into motion components
export const MotionCard = motion.create(Card.Root);
export const MotionButton = motion.create(Button);
