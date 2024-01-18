import styles from "@/app/ui/bar.module.css";

export default function Footer() {
    return (
        <footer className={`${styles.barBackground} p-4`}>
            <p className="text-center text-white">© 2024 Chess Buddy. All rights reserved.</p>
        </footer>
    )
}