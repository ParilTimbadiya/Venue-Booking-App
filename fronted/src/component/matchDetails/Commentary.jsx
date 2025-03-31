// import React from 'react'
// import parse from 'html-react-parser';
// import _ from 'lodash';
// const Commentary = (props) => {
//     const { commentaryList } = props;

//     let commText = commentaryList?.commText
//     let commentaryFormat = commentaryList?.commentaryFormats;
//     let boldText = commentaryFormat?.bold?.formatValue[0];
//     //Api returns special symbols for names or events like wickets and boundaries in the commentary text which can be replaced with the 
//     // formatValue in the commentaryFormat  

//     if (commentaryFormat?.bold?.formatId?.[1]) {
//         // escaping special characters of regex using lodash escapeRegExp function
//         const formatIdStr = _.escapeRegExp(commentaryFormat.bold.formatId[1]);
//         const formatId = new RegExp(formatIdStr);
//         commText = commText.replace(formatId, `<strong> ${commentaryFormat?.bold?.formatValue?.[1]} </strong>`)
//     }
//     if (commentaryFormat?.bold) {
//         // escaping special characters of regex using lodash escapeRegExp function
//         const formatIdStr = _.escapeRegExp(commentaryFormat?.bold?.formatId[0]);
//         const formatId = new RegExp(formatIdStr, 'g');
//         commText = commText.replace(formatId, `<strong> ${boldText} </strong>`)
//     }
//     if (commentaryFormat?.italic) {
//         const formatIdStr = _.escapeRegExp(commentaryFormat?.italic?.formatId[0]);
//         const formatId = new RegExp(formatIdStr, 'g');
//         commText = commText.replace(formatId, `<b><i> ${commentaryFormat?.italic?.formatValue[0]} </i> </b>`)
//     }

//     return (
//         <div>
//             {
//                 commentaryList.overSeparator ?
//                     <div className='last-over bg-[#1e293b]'>
//                         <div ><p>{commentaryList?.overNumber + 0.4}</p></div>
//                         <div className='last-over-wrapper '>
//                             <div >
//                                 <p>Runs Scored: {commentaryList?.overSeparator?.runs}</p>
//                                 <p>{commentaryList?.overSeparator?.o_summary}</p>
//                             </div>
//                             <div>
//                                 <p>Score After {commentaryList?.overNumber + 0.4} overs</p>
//                                 <p> {commentaryList?.overSeparator?.batTeamName} {commentaryList?.overSeparator?.score}/{commentaryList?.overSeparator?.wickets}</p>
//                             </div>
//                             <div>
//                                 <p>{commentaryList?.overSeparator?.batStrikerNames[0]} {commentaryList?.overSeparator?.batStrikerRuns}({commentaryList?.overSeparator?.batStrikerBalls})</p>
//                                 <p>{commentaryList?.overSeparator?.batNonStrikerNames[0]} {commentaryList?.overSeparator?.batNonStrikerRuns}({commentaryList?.overSeparator?.batNonStrikerBalls})</p>
//                             </div>
//                             <div>
//                                 <p>{commentaryList?.overSeparator?.bowlNames[0]}</p>
//                                 <p> {commentaryList?.overSeparator?.bowlOvers}-{commentaryList?.overSeparator?.bowlMaidens}-{commentaryList?.overSeparator?.bowlRuns}-{commentaryList?.overSeparator?.bowlWickets}</p>
//                             </div>
//                         </div>
//                     </div>
//                     :
//                     ""
//             }
//             <div className='commText'>
//                 <span>{commentaryList.overNumber}</span>
//                 <p>{parse(commText)}</p>
//             </div>
//         </div>
//     )
// }

// export default Commentary




import React from 'react';
import parse from 'html-react-parser';
import _ from 'lodash';

const Commentary = ({ commentaryList }) => {
    let commText = commentaryList?.commText;
    let commentaryFormat = commentaryList?.commentaryFormats;
    let boldText = commentaryFormat?.bold?.formatValue[0];

    if (commentaryFormat?.bold?.formatId?.[1]) {
        const formatIdStr = _.escapeRegExp(commentaryFormat.bold.formatId[1]);
        const formatId = new RegExp(formatIdStr);
        commText = commText.replace(formatId, `<strong>${commentaryFormat?.bold?.formatValue?.[1]}</strong>`);
    }
    if (commentaryFormat?.bold) {
        const formatIdStr = _.escapeRegExp(commentaryFormat?.bold?.formatId[0]);
        const formatId = new RegExp(formatIdStr, 'g');
        commText = commText.replace(formatId, `<strong>${boldText}</strong>`);
    }
    if (commentaryFormat?.italic) {
        const formatIdStr = _.escapeRegExp(commentaryFormat?.italic?.formatId[0]);
        const formatId = new RegExp(formatIdStr, 'g');
        commText = commText.replace(formatId, `<b><i>${commentaryFormat?.italic?.formatValue[0]}</i></b>`);
    }

    return (
        <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg space-y-4">
            {commentaryList.overSeparator && (
                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="text-lg font-semibold text-yellow-400">
                        Over: {commentaryList?.overNumber + 0.4}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2 text-gray-300">
                        <div>
                            <p>Runs Scored: <span className="font-bold text-green-400">{commentaryList?.overSeparator?.runs}</span></p>
                            <p>{commentaryList?.overSeparator?.o_summary}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Score After {commentaryList?.overNumber + 0.4} overs</p>
                            <p className="text-blue-400">{commentaryList?.overSeparator?.batTeamName} {commentaryList?.overSeparator?.score}/{commentaryList?.overSeparator?.wickets}</p>
                        </div>
                        <div>
                            <p>{commentaryList?.overSeparator?.batStrikerNames[0]}: {commentaryList?.overSeparator?.batStrikerRuns}({commentaryList?.overSeparator?.batStrikerBalls})</p>
                            <p>{commentaryList?.overSeparator?.batNonStrikerNames[0]}: {commentaryList?.overSeparator?.batNonStrikerRuns}({commentaryList?.overSeparator?.batNonStrikerBalls})</p>
                        </div>
                        <div>
                            <p className="font-semibold">{commentaryList?.overSeparator?.bowlNames[0]}</p>
                            <p className="text-red-400">{commentaryList?.overSeparator?.bowlOvers}-{commentaryList?.overSeparator?.bowlMaidens}-{commentaryList?.overSeparator?.bowlRuns}-{commentaryList?.overSeparator?.bowlWickets}</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg shadow">
                <span className="text-yellow-400 text-lg font-semibold">{commentaryList.overNumber}</span>
                <p className="text-gray-300">{parse(commText)}</p>
            </div>
        </div>
    );
};

export default Commentary;

