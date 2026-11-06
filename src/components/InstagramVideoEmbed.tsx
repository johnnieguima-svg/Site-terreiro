import { useEffect } from 'react';

// Declare window properties for TypeScript
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export function InstagramVideoEmbed({ htmlSnippet }: { htmlSnippet: string }) {
  useEffect(() => {
    // We add a slight delay to ensure the DOM is ready for the script to process the blockquote
    const timer = setTimeout(() => {
      const existingScript = document.getElementById('instagram-embed-script');
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'instagram-embed-script';
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
      } else if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex justify-center shrink-0 min-h-[500px]">
      <div 
        dangerouslySetInnerHTML={{ __html: htmlSnippet }} 
        className="w-full flex justify-center"
      />
    </div>
  );
}
