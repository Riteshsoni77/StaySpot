import "./Footer.css";
export default function Footer(){
    return(
        <footer className="footer">
            <div className="f-info">
           
                <div>&copy; Stayspot Private Limited</div>
                <div className="f-info-links">
                    <a href="/privacy">Privacy</a>
                    <a href="/terms">Terms</a>
                </div>
            </div>
        </footer>
    )
}