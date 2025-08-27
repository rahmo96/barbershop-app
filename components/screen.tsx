// expo install expo-linear-gradient
import { LinearGradient } from 'expo-linear-gradient';

export default function Screen() {
    return (
        <LinearGradient
            colors={['#f8f8cc', '#ecec9d', '#f8f6f2']} // שחור→פחם
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            {/* התוכן שלך כאן */}
        </LinearGradient>
    );
}
