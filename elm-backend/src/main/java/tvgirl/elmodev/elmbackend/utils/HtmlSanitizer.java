package tvgirl.elmodev.elmbackend.utils;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.safety.Cleaner;
import org.jsoup.safety.Safelist;

public class HtmlSanitizer {

    private static final Safelist safelist = Safelist.relaxed()
            .addTags("img")
            .addAttributes("img", "src", "alt", "width", "height", "class")
            .addAttributes("p", "class")
            .addAttributes("h1", "class")
            .addAttributes("h2", "class")
            .addAttributes("h3", "class")
            .addAttributes("h4", "class")
            .addAttributes("h5", "class")
            .addAttributes("h6", "class")
            .addEnforcedAttribute("a", "rel", "nofollow noopener noreferrer");

    public static String sanitize(String html) {
        if (html == null || html.isEmpty()) {
            return "";
        }

        Document dirtyDoc = Jsoup.parseBodyFragment(html);

        for (Element element : dirtyDoc.select("p, h1, h2, h3, h4, h5, h6")) {
            String style = element.attr("style").toLowerCase().replaceAll("\\s+", "");

            if (style.contains("text-align:center")) {
                element.addClass("text-center");
            } else if (style.contains("text-align:right")) {
                element.addClass("text-right");
            } else if (style.contains("text-align:left")) {
                element.addClass("text-left");
            }

            element.removeAttr("style");
        }

        Cleaner cleaner = new Cleaner(safelist);
        Document cleanDoc = cleaner.clean(dirtyDoc);

        return cleanDoc.body().html();
    }
}